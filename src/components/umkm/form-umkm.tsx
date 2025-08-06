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
import { CreateUmkmData, NamaDesa } from "@/type/data";
import { Button } from "../ui/button";
import React from "react";
import { toast } from "sonner";
import { useUmkm } from "@/hooks/use-umkm";
import { Textarea } from "../ui/textarea";

export function FormUMKM({ onSuccess }: { onSuccess?: () => void }) {
    const { createUmkm } = useUmkm();

    const [formData, setFormData] = React.useState<CreateUmkmData>({
        namaUmkm: "",
        gambarUrl: "",
        deskripsi: "",
        desa: "",
        mapUrl: "",
    });

    const [imageFile, setImageFile] = React.useState<File | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
            // For now, we'll use a placeholder URL or implement actual image upload
            // You might want to integrate with your image upload service here
            const imageUrl = URL.createObjectURL(e.target.files[0]);
            setFormData({ ...formData, gambarUrl: imageUrl });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!imageFile) {
                toast.error("Gambar belum dipilih");
                return;
            }

            if (!formData.namaUmkm || !formData.deskripsi || !formData.desa || !formData.mapUrl) {
                toast.error("Semua field harus diisi");
                return;
            }

            // Here you would typically upload the image first and get the URL
            // For now, we'll use the placeholder URL
            await createUmkm.createUmkm(formData);

            // Reset form
            setFormData({
                namaUmkm: "",
                gambarUrl: "",
                deskripsi: "",
                desa: "",
                mapUrl: "",
            });
            setImageFile(null);

            if (!createUmkm.error) {
                toast.success("Berhasil membuat UMKM");
                if (onSuccess) onSuccess();
            } else {
                toast.error("Gagal membuat UMKM");
            }
        } catch (error) {
            console.error("Gagal membuat UMKM:", error);
            toast.error("Gagal Membuat UMKM");
        }
    };

    return (
        <div className="py-2 px-3">
            <form className="space-y-5" onSubmit={handleSubmit}>
                <Input
                    id="namaUmkm"
                    type="text"
                    placeholder="Nama UMKM"
                    value={formData.namaUmkm}
                    onChange={handleChange}
                    required
                />

                <Textarea
                    id="deskripsi"
                    placeholder="Deskripsi UMKM"
                    value={formData.deskripsi}
                    onChange={handleChange}
                    required
                    rows={4}
                />

                <Input
                    id="mapUrl"
                    type="url"
                    placeholder="Link Google Maps"
                    value={formData.mapUrl}
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

                <Button 
                    type="submit" 
                    className="w-full cursor-pointer" 
                    disabled={createUmkm.loading}
                >
                    {createUmkm.loading ? "Menyimpan..." : "Buat UMKM"}
                </Button>
            </form>

            <div className="font-semibold mt-4">
                **Teliti sebelum submit data UMKM
            </div>
        </div>
    );
}