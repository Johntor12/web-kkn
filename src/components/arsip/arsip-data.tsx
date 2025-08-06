'use client'

import React from 'react'

import { copyToClipboard, createActionsColumn, createSortableHeader, formatDate } from "@/lib/table-helper"
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
import { FormArsip } from './form-arsip'

import { useDeleteArsip, useGetAllArsip } from '@/hooks/use-arsip';
import { GetAllArsipPayloadInterface } from '@/type/payload';
import { ArsipData as ArsipDataType } from '@/type/data'

export function GalleryDialog() {
    const [open, setOpen] = React.useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <PlusCircle className="w-4 h-4" />
                    <span>Tambah Arsip</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl w-full">
                <DialogHeader>
                    <DialogTitle>Tambah Arsip</DialogTitle>
                    <DialogDescription>
                        Silakan isi form berikut untuk menambahkan arsip baru.
                    </DialogDescription>
                </DialogHeader>
                <FormArsip onSuccess={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    );
}

export function ArsipData() {
    const [data, setData] = React.useState<GetAllArsipPayloadInterface["data"]>([]);

    const { payload, loading, getAllArsip } = useGetAllArsip();
    const { deleteArsip, error: deleteError } = useDeleteArsip();

    React.useEffect(() => {
        getAllArsip();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        if (Array.isArray(payload?.data)) {
            setData(payload.data);
        }
    }, [payload]);

    if (loading) return <Loader />;

    async function handleDelete(id: number) {
        await deleteArsip(id);
        setData((prev) => prev.filter((item) => item.arsipId !== id));
        if (!deleteError) {
            toast("Berhasil Menghapus Data");
        } else {
            toast("Gagal Menghapus Data");
        }
    }

    const columns: ColumnDef<ArsipDataType>[] = [
        {
            accessorKey: "judul",
            header: createSortableHeader("Judul"),
            cell: ({ row }) => (
                <div className="capitalize font-semibold text-sm">
                    {row.getValue("judul")}
                </div>
            ),
        },
        {
            accessorKey: "desa",
            header: createSortableHeader("Desa"),
            cell: ({ row }) => (
                <div className="lowercase text-blue-600">{row.getValue("desa")}</div>
            ),
        },
        {
            accessorKey: "uploadedAt",
            header: createSortableHeader("Tanggal"),
            cell: ({ row }) => (
                <div className="text-sm">
                    {formatDate(row.getValue("uploadedAt"))}
                </div>
            ),
        },
        createActionsColumn<ArsipDataType>([
            {
                label: "Copy Arsip ID",
                onClick: (row) => copyToClipboard(row.arsipId.toString())
            },
            {
                label: "Copy Title",
                onClick: (row) => copyToClipboard(row.judul)
            },
            {
                label: "Hapus Arsip",
                onClick: (row) => handleDelete(row.arsipId)
            }
        ])
    ];

    return (
        <div>
            <div>
                <GalleryDialog />
            </div>
            <DataTable
                data={data}
                columns={columns}
                searchable={[
                    { column: "judul", placeholder: "Filter judul arsip..." },
                    { column: "desa", placeholder: "Filter desa..." }
                ]}
                filterable={true}
                selectable={true}
                pagination={true}
            />
        </div>
    );
}