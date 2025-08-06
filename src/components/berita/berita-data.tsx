/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import React from 'react'

import { useBerita } from "@/hooks/use-berita"
import { copyToClipboard, createActionsColumn, createSortableHeader, formatDate } from "@/lib/table-helper"
import { BeritaDataType } from "@/type/data"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from '../data-table'
import { Loader } from '../loader'
import { toast } from 'sonner'
import { redirect } from 'next/navigation'
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
import { FormBerita } from '../berita/form-berita'

export function BeritaDialog() {
    const [open, setOpen] = React.useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <PlusCircle className="w-4 h-4" />
                    <span>Tambah Berita</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl w-full">
                <DialogHeader>
                    <DialogTitle>Tambah Berita</DialogTitle>
                    <DialogDescription>
                        Silakan isi form berikut untuk menambahkan berita baru.
                    </DialogDescription>
                </DialogHeader>
                <FormBerita onSuccess={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    );
}

export default function BeritaData() {
    const { getMyBerita, deleteBerita } = useBerita();
    const [data, setData] = React.useState<BeritaDataType[]>([]);

    React.useEffect(() => {
        async function fetchData() {
            await getMyBerita.getMyBerita();
        }
        fetchData();
    }, [])

    React.useEffect(() => {
        if (Array.isArray(getMyBerita.payload?.data)) {
            setData(getMyBerita.payload.data);
        }
    }, [getMyBerita.payload])

    if (getMyBerita.loading) return <Loader />

    async function deleteNews(id: number) {
        await deleteBerita.deleteBerita(id);
        if (deleteBerita.error === null) {
            setData((prev) => prev.filter((item) => item.beritaId !== id));
            toast("Berhasil Menghapus Data")
        }
        else {
            toast("Gagal Menghapus Data")
        }
    };

    const columns: ColumnDef<BeritaDataType>[] = [
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
            accessorKey: "createdAt",
            header: createSortableHeader("Tanggal"),
            cell: ({ row }) => (
                <div className="text-sm">
                    {formatDate(row.getValue("createdAt"))}
                </div>
            ),
        },
        {
            accessorKey: "author.username",
            header: "Author",
            cell: ({ row }) => (
                <div className="text-sm">{row.original.author.username}</div>
            ),
        },
        createActionsColumn<BeritaDataType>([
            {
                label: "Copy Berita ID",
                onClick: (row) => copyToClipboard(row.beritaId.toString())
            },
            {
                label: "Copy Title",
                onClick: (row) => copyToClipboard(row.judul)
            },
            {
                label: "Hapus Berita",
                onClick: (row) => deleteNews(row.beritaId)
            },
            {
                label: "Update Berita",
                onClick: (row) => redirect(`berita-admin/${row.beritaId}`)
            }
        ])
    ]

    return (
        <div>
            <div>
                <BeritaDialog />
            </div>
            <DataTable
                data={data}
                columns={columns}
                searchable={[
                    { column: "judul", placeholder: "Filter judul berita..." },
                    { column: "desa", placeholder: "Filter desa..." }
                ]}
                filterable={true}
                selectable={true}
                pagination={true}
            />
        </div>
    );
};
