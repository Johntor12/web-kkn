'use client';

import { Input } from "../ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { GaleriData, NamaDesa } from "@/type/data";
import { Button } from "../ui/button";
import React from "react";
import { toast } from "sonner";
import { useCreateGaleri, useUploadGaleriImage } from "@/hooks/use-gallery";

export function FormGallery({ onSuccess }: { onSuccess?: () => void }) {
    const { createGaleri } = useCreateGaleri();
    const { uploadImage, uploading } = useUploadGaleriImage();

    const [formData, setFormData] = React.useState<Omit<GaleriData, "fileUrl">>({
        judul: "",
        desa: "",
    });
    const [imageFile, setImageFile] = React.useState<File | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!imageFile) {
                toast.error("Gambar belum dipilih");
                return;
            }

            const imageUrl = await uploadImage(imageFile);
            if (!imageUrl) {
                toast.error("Upload gambar gagal");
                return;
            }

            await createGaleri({
                ...formData,
                fileUrl: imageUrl,
            });

            setFormData({ judul: "", desa: ""});
            setImageFile(null);

            toast.success("Berhasil membuat Galeri");
            if (onSuccess) onSuccess();
        } catch (error) {
            console.error("Gagal membuat galeri:", error);
            toast.error("Gagal Membuat Galeri");
        }
    };

    return (
        <div className="py-2 px-3">
            <form className="space-y-5" onSubmit={handleSubmit}>
                <Input
                    id="judul"
                    type="text"
                    placeholder="Judul Gallery"
                    value={formData.judul}
                    onChange={handleChange}
                    required
                />

                <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                />

                <Select
                    value={formData.desa}
                    onValueChange={(value) =>
                        setFormData({ ...formData, desa: value })
                    }
                >
                    <SelectTrigger className="w-full border border-gray-300 rounded-sm">
                        <SelectValue placeholder="Pilih Desa" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-300 rounded-md p-2">
                        <SelectGroup>
                            <SelectLabel>Desa</SelectLabel>
                            <SelectItem value={NamaDesa.binalawan}>{NamaDesa.binalawan}</SelectItem>
                            <SelectItem value={NamaDesa.enreukan}>{NamaDesa.enreukan}</SelectItem>
                            <SelectItem value={NamaDesa.liangbunyu}>{NamaDesa.liangbunyu}</SelectItem>
                            <SelectItem value={NamaDesa.setabu}>{NamaDesa.setabu}</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Button type="submit" className="w-full cursor-pointer" disabled={uploading}>
                    {uploading ? "Mengunggah..." : "Buat"}
                </Button>
            </form>

            <div className="font-semibold mt-4">
                **Teliti sebelum submit galeri
            </div>
        </div>
    );
}
