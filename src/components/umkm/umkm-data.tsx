'use client'

import React from 'react'

import { copyToClipboard, createActionsColumn, createSortableHeader } from "@/lib/table-helper"
import { UmkmData } from "@/type/data"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from '../data-table'
import { Loader } from '../loader'
import { toast } from 'sonner'
import { PlusCircle } from 'lucide-react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '../ui/button'
import { FormUMKM } from './form-umkm'
import { useUmkm } from '@/hooks/use-umkm'

export function UMKMDialog() {
    const [open, setOpen] = React.useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <PlusCircle className="w-4 h-4" />
                    <span>Tambah UMKM</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Tambah UMKM</DialogTitle>
                    <DialogDescription>
                        Silakan isi form berikut untuk menambahkan UMKM baru.
                    </DialogDescription>
                </DialogHeader>
                <FormUMKM onSuccess={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    );
}

export function UMKMData() {
    const [data, setData] = React.useState<UmkmData[]>([]);

    const { getAllUmkm, deleteUmkm } = useUmkm();

    React.useEffect(() => {
        const fetchData = async () => {
            await getAllUmkm.getAllUmkm();
        };
        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Update local data when API response changes
    React.useEffect(() => {
        if (getAllUmkm.payload?.data && Array.isArray(getAllUmkm.payload.data)) {
            setData(getAllUmkm.payload.data);
        }
    }, [getAllUmkm.payload]);

    if (getAllUmkm.loading) return <Loader />;

    async function deleteUmkmData(id: number) {
        try {
            await deleteUmkm.deleteUmkm(id);

            if (!deleteUmkm.error) {
                // Remove item from local state
                setData((prev) => prev.filter((item) => item.umkmId !== id));
                toast.success("Berhasil Menghapus UMKM");
            } else {
                toast.error("Gagal Menghapus UMKM");
            }
        } catch (error) {
            console.error("Error deleting UMKM:", error);
            toast.error("Gagal Menghapus UMKM");
        }
    }

    const columns: ColumnDef<UmkmData>[] = [
        {
            accessorKey: "namaUmkm",
            header: createSortableHeader("Nama UMKM"),
            cell: ({ row }) => (
                <div className="font-semibold text-sm">
                    {row.getValue("namaUmkm")}
                </div>
            ),
        },
        {
            accessorKey: "desa",
            header: createSortableHeader("Desa"),
            cell: ({ row }) => (
                <div className="capitalize text-blue-600">{row.getValue("desa")}</div>
            ),
        },
        {
            accessorKey: "deskripsi",
            header: createSortableHeader("Deskripsi"),
            cell: ({ row }) => {
                const deskripsi = row.getValue("deskripsi") as string;
                return (
                    <div className="text-sm text-gray-600 max-w-[200px] truncate" title={deskripsi}>
                        {deskripsi}
                    </div>
                );
            },
        },
        createActionsColumn<UmkmData>([
            {
                label: "Copy UMKM ID",
                onClick: (row) => copyToClipboard(row.umkmId.toString())
            },
            {
                label: "Copy Nama UMKM",
                onClick: (row) => copyToClipboard(row.namaUmkm)
            },
            {
                label: "Copy Map URL",
                onClick: (row) => copyToClipboard(row.mapUrl)
            },
            {
                label: "Hapus UMKM",
                onClick: (row) => {
                    if (confirm(`Apakah Anda yakin ingin menghapus UMKM "${row.namaUmkm}"?`)) {
                        deleteUmkmData(row.umkmId);
                    }
                }
            }
        ])
    ]

    return (
        <div>
            <div className="mb-4">
                <UMKMDialog />
            </div>
            <DataTable
                data={data}
                columns={columns}
                searchable={[
                    { column: "namaUmkm", placeholder: "Filter nama UMKM..." },
                    { column: "desa", placeholder: "Filter desa..." }
                ]}
                filterable={true}
                selectable={true}
                pagination={true}
            />
        </div>
    );
}