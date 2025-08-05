'use client'

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { usePeraturan } from "@/hooks/use-rule";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { NamaDesa } from "@/type/data";

export function PearturanForm({ onSuccess }: { onSuccess?: () => void }) {
    const [judul, setJudul] = useState("");
    const [desaOption, setDesaOption] = React.useState<NamaDesa>(NamaDesa.binalawan);
    const [file, setFile] = useState<File | null>(null);

    const router = useRouter();
    const { uploadToGoogleDrive, createNewRule } = usePeraturan();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!judul || !desaOption || !file) {
            toast("Gagal Membuat Peraturan Baru", { duration: 8000 })
            return;
        }

        try {
            const uploadRes = await uploadToGoogleDrive.uploadDocument(file);
            if (!uploadRes?.docUrl) throw new Error("Upload file gagal");

            await createNewRule.createRule({
                judul,
                desa: desaOption,
                fileUrl: uploadRes.docUrl,
            });

            toast("Berhasil membuat Peraturan Baru", { duration: 8000 })
            if (onSuccess) onSuccess();
            router.refresh();
        } catch (err) {
            toast(`Gagal Membuat Berita ${err}`)

        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="judul">Judul Peraturan</Label>
                <Input
                    id="judul"
                    placeholder="Contoh: Peraturan Pengelolaan Sampah"
                    value={judul}
                    onChange={(e) => setJudul(e.target.value)}
                />
            </div>

            <div className="space-y-2">
                <Label>Pilih Desa</Label>
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

            <div className="space-y-2">
                <Label htmlFor="file">Upload Dokumen PDF</Label>
                <Input
                    id="file"
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => {
                        if (e.target.files?.[0]) {
                            setFile(e.target.files[0]);
                        }
                    }}
                />
            </div>

            <Button
                type="submit"
                disabled={uploadToGoogleDrive.loading || createNewRule.loading}
                className={cn(
                    uploadToGoogleDrive.loading || createNewRule.loading ? "opacity-50" : ""
                )}
            >
                {uploadToGoogleDrive.loading || createNewRule.loading ? (
                    <div className="flex items-center gap-2">
                        <span>Menyimpan...</span>
                    </div>
                ) : (
                    "Simpan Peraturan"
                )}
            </Button>
        </form>
    );
}
