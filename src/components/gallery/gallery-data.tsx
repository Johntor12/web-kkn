'use client'

import React from 'react'

import { copyToClipboard, createActionsColumn, createSortableHeader, formatDate } from "@/lib/table-helper"
import { Galeri } from "@/type/data"
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
import { useDeleteGaleri, useGetAllGaleri } from '@/hooks/use-gallery'
import { FormGallery } from './form-gallery'

export function GalleryDialog() {
    const [open, setOpen] = React.useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <PlusCircle className="w-4 h-4" />
                    <span>Tambah Gallery</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl w-full">
                <DialogHeader>
                    <DialogTitle>Tambah Gallery</DialogTitle>
                    <DialogDescription>
                        Silakan isi form berikut untuk menambahkan gallery baru.
                    </DialogDescription>
                </DialogHeader>
                <FormGallery onSuccess={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    );
}

export function GalleryData() {
    const [data, setData] = React.useState<Galeri[]>([]);

    const { galeri, loading } = useGetAllGaleri();
    const { deleteGaleri, error: deleteError } = useDeleteGaleri();

    React.useEffect(() => {
        if (Array.isArray(galeri)) {
            setData(galeri);
        }
    }, [galeri]);

    if (loading) return <Loader />;

    async function deleteNews(id: number) {
        await deleteGaleri(id);

        // Gunakan notifikasi berdasarkan error terbaru
        setData((prev) => prev.filter((item) => item.galeriId !== id));

        if (!deleteError) {
            toast("Berhasil Menghapus Data");
        } else {
            toast("Gagal Menghapus Data");
        }
    }

    const columns: ColumnDef<Galeri>[] = [
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
        createActionsColumn<Galeri>([
            {
                label: "Copy Berita ID",
                onClick: (row) => copyToClipboard(row.galeriId.toString())
            },
            {
                label: "Copy Title",
                onClick: (row) => copyToClipboard(row.judul)
            },
            {
                label: "Hapus Gallery",
                onClick: (row) => deleteNews(row.galeriId)
            }
        ])
    ]

    return (
        <div>
            <div>
                <GalleryDialog />
            </div>
            <DataTable
                data={data}
                columns={columns}
                searchable={[
                    { column: "judul", placeholder: "Filter judul gallerry..." },
                    { column: "desa", placeholder: "Filter desa..." }
                ]}
                filterable={true}
                selectable={true}
                pagination={true}
            />
        </div>
    );
}