'use client';


import { Input } from "../ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreateBeritaData, NamaDesa } from "@/type/data";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useBerita } from "@/hooks/use-berita";
import React from "react";
import { toast } from "sonner";

export function FormBerita(
    {onSuccess}: {onSuccess?: () => void}
) {
    const { createBerita } = useBerita();
    const [formData, setFormData] = React.useState<CreateBeritaData>({
        judul: "",
        gambarUrl: "",
        isi: "",
        desa: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createBerita.createBerita(formData);
            setFormData({ judul: "", gambarUrl: "", isi: "", desa: "" });
            toast("Berhasil membuat Berita Baru akan dialihkan ke beranda berita", { duration: 8000 })
            if (onSuccess) onSuccess();
        } catch (error) {
            console.error("Gagal membuat berita:", error);
            toast("Gagal Membuat Berita")
        }
    };

    return (
        <div className="py-2 px-3">
            <div className="">
                <div>
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <Input
                            id="judul"
                            type="text"
                            placeholder="Judul Berita"
                            value={formData.judul}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            id="gambarUrl"
                            type="text"
                            placeholder="URL Gambar dari Google Drive"
                            value={formData.gambarUrl}
                            onChange={handleChange}
                            required
                        />
                        <div>
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
                        </div>
                        <Textarea
                            id="isi"
                            placeholder="Masukkan Isi Berita Di Sini..."
                            className="h-[10vw] resize-none"
                            value={formData.isi}
                            onChange={handleChange}
                            required
                        />
                        <Button type="submit" className="w-full cursor-pointer">Buat</Button>
                    </form>
                </div>
                <div className="font-semibold">
                    **Teliti sebelum submit berita
                </div>
            </div>
        </div>
    )
}