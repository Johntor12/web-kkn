/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import React from 'react'

import { copyToClipboard, createActionsColumn, createSortableHeader, formatDate } from "@/lib/table-helper"
import { NamaDesa, PeraturanById } from "@/type/data"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from '../data-table'
import { Loader } from '../loader'
import { usePeraturan } from '@/hooks/use-rule'
import { Label } from '@radix-ui/react-dropdown-menu'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { PlusCircle } from 'lucide-react'
import { PearturanForm } from './peraturan-form'


export function PeraturanDialog() {
    const [open, setOpen] = React.useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <PlusCircle className="w-4 h-4" />
                    <span>Tambah Peraturan</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl w-full">
                <DialogHeader>
                    <DialogTitle>Tambah Berita</DialogTitle>
                    <DialogDescription>
                        Silakan isi form berikut untuk menambahkan berita baru.
                    </DialogDescription>
                </DialogHeader>
                <PearturanForm onSuccess={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    );
}


export default function RuleData() {
    const { getRuleByDesa } = usePeraturan();
    const [data, setData] = React.useState<PeraturanById[]>([]);

    const [desaOption, setDesaOption] = React.useState<NamaDesa>(NamaDesa.binalawan);

    React.useEffect(() => {
        async function fetchData() {
            await getRuleByDesa.getRuleByDesa(desaOption);
        }
        fetchData();
    }, [desaOption, setDesaOption])

    React.useEffect(() => {
        if (Array.isArray(getRuleByDesa.payload?.data)) {
            setData(getRuleByDesa.payload.data);
            console.log(getRuleByDesa.payload?.data);
        }
    }, [getRuleByDesa.payload])

    if (getRuleByDesa.loading) return <Loader />


    const columns: ColumnDef<PeraturanById>[] = [
        {
            accessorKey: "judul",
            header: createSortableHeader("Judul"),
            cell: ({ row }) => (
                <div className="capitalize text-sm">
                    {row.getValue("judul")}
                </div>
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
        {
            accessorKey: "author.username",
            header: "File URL",
            cell: ({ row }) => (
                <div className="text-sm">{row.original.fileUrl.slice(0, 20) + "..."}</div>
            ),
        },
        createActionsColumn<PeraturanById>([
            {
                label: "Copy Rule Dokumen",
                onClick: (row) => copyToClipboard(row.fileUrl.toString())
            },
            {
                label: "Copy Title",
                onClick: (row) => copyToClipboard(row.judul)
            },
        ])
    ]

    return (
        <div className='w-full'>
            <div className='w-full flex items-center justify-between'>
                {/* selector */}
                <div className="w-full max-w-xs mb-6">
                    <Label className="block mb-2 text-sm font-medium text-gray-700">Pilih Desa</Label>
                    <Select value={desaOption} onValueChange={(value) => setDesaOption(value as NamaDesa)}>
                        <SelectTrigger className="w-full px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center justify-between">
                            <SelectValue placeholder="Pilih Desa" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-200 rounded-md shadow-lg mt-1 z-50 w-full">
                            <SelectGroup>
                                <SelectLabel className="px-4 py-2 text-xs text-gray-500">Desa</SelectLabel>
                                {Object.values(NamaDesa).map((desa) => (
                                    <SelectItem
                                        key={desa}
                                        value={desa}
                                        className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                                    >
                                        {desa}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                {/* create dialog */}
                <PeraturanDialog />
            </div>
            <DataTable
                data={data}
                columns={columns}
                searchable={[
                    { column: "judul", placeholder: "Filter judul peraturan..." },
                ]}
                filterable={true}
                selectable={true}
                pagination={true}
            />
        </div>
    );
};
