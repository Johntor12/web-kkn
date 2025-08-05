'use client'

import AuthLayout from "@/layout/auth-layout"
import { CreateBeritaData, NamaDesa } from "@/type/data"
import React from "react"

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useBerita } from "@/hooks/use-berita";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { toast } from "sonner"
import { redirect } from "next/navigation"

export default function CreateBeritaPage() {
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
            toast("Berhasil membuat Berita Baru akan dialihkan ke /beranda", { onAutoClose: () => redirect('/beranda'), duration: 8000 })
        } catch (error) {
            console.error("Gagal membuat berita:", error);
            toast("Gagal Membuat Berita")
        }
    };

    return (
        <AuthLayout>
            <div className="w-full min-h-screen flex justify-center items-center p-10">
                <Card className="w-[90vw] md:w-[50vw]">
                    <CardHeader>
                        <CardTitle>Buat Berita</CardTitle>
                        <CardDescription>
                            Buat Berita Dengan Judul Yang Informatif dan Isi yang Deskriptif
                        </CardDescription>
                        <CardAction className="underline cursor-pointer" onClick={() => redirect('/beranda')}>Kembali</CardAction>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <div className="grid gap-2">
                                <Label htmlFor="judul">Judul Berita</Label>
                                <Input
                                    id="judul"
                                    type="text"
                                    placeholder="Judul Berita"
                                    value={formData.judul}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="gambarUrl">Gambar Berita</Label>
                                <Input
                                    id="gambarUrl"
                                    type="text"
                                    placeholder="URL Gambar dari Google Drive"
                                    value={formData.gambarUrl}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="desa">Pilih Desa</Label>
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
                            <div className="grid gap-2">
                                <Label htmlFor="isi">Isi Berita</Label>
                                <Textarea
                                    id="isi"
                                    placeholder="Masukkan Isi Berita Di Sini..."
                                    className="h-[10vw] resize-none"
                                    value={formData.isi}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full cursor-pointer">Buat</Button>
                        </form>
                    </CardContent>
                    <CardFooter className="font-semibold">
                        **Teliti sebelum submit berita
                    </CardFooter>
                </Card>
            </div>
        </AuthLayout>
    );
}
