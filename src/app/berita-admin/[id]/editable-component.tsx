/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { UpdateBeritaData } from "@/type/data"
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
import { toast } from "sonner"
import { redirect } from "next/navigation"

export function UpdateBerita({ beritaId }: { beritaId: number }) {
    const { updateBerita, getBeritaById } = useBerita();

    const [formData, setFormData] = React.useState<UpdateBeritaData>({
        judul: "",
        gambarUrl: "",
        isi: "",
    });

    React.useEffect(() => {
        async function fetchBerita() {
            try {
                await getBeritaById.getBeritaById(beritaId);
            } catch (error) {
                console.error("Failed to fetch berita:", error);
                toast("Gagal memuat data berita");
            }
        }
        fetchBerita();
    }, [beritaId]);

    React.useEffect(() => {
        if (getBeritaById.payload?.data) {
            setFormData({
                judul: getBeritaById.payload.data.judul || "",
                gambarUrl: getBeritaById.payload.data.gambarUrl || "",
                isi: getBeritaById.payload.data.isi || "",
            });
        }
    }, [getBeritaById.payload?.data]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.judul || !formData.gambarUrl || !formData.isi) {
            toast("Semua field harus diisi");
            return;
        }

        if (updateBerita.loading) {
            return;
        }

        try {
            await updateBerita.updateBerita(beritaId, formData);
            toast("Berhasil mengupdate berita! Akan dialihkan ke /beranda", {
                onAutoClose: () => redirect('/beranda'),
                duration: 3000
            });
        } catch (error) {
            console.error("Gagal mengupdate berita:", error);
            toast("Gagal mengupdate berita");
        }
    };

    const handleBack = () => {
        redirect('/beranda');
    };

    if (getBeritaById.loading && !getBeritaById.payload) {
        return (
            <div className="w-full min-h-screen flex justify-center items-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
                    <p className="mt-4">Memuat data berita...</p>
                </div>
            </div>
        );
    }

    if (getBeritaById.error) {
        return (
            <div className="w-full min-h-screen flex justify-center items-center">
                <Card className="w-[90vw] md:w-[50vw]">
                    <CardHeader>
                        <CardTitle>Error</CardTitle>
                        <CardDescription>
                            Gagal memuat data berita
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-red-500">
                            {getBeritaById.error.message || "Terjadi kesalahan"}
                        </p>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={handleBack} variant="outline" className="w-full">
                            Kembali ke Beranda
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen flex justify-center items-center">
            <Card className="md:w-[50vw] w-[80vw] mt-[5vw]">
                <CardHeader>
                    <CardTitle>Update Berita</CardTitle>
                    <CardDescription>
                        Silahkan lakukan editing berita
                    </CardDescription>
                    <CardAction
                        className="underline cursor-pointer text-blue-600 hover:text-blue-800"
                        onClick={handleBack}
                    >
                        Kembali
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div className="grid gap-2">
                            <Label htmlFor="judul">Judul Berita *</Label>
                            <Input
                                id="judul"
                                type="text"
                                placeholder="Judul Berita"
                                value={formData.judul}
                                onChange={handleChange}
                                required
                                disabled={updateBerita.loading}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="gambarUrl">Gambar Berita *</Label>
                            <Input
                                id="gambarUrl"
                                type="text"
                                placeholder="URL Gambar dari Google Drive"
                                value={formData.gambarUrl}
                                onChange={handleChange}
                                required
                                disabled={updateBerita.loading}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="isi">Isi Berita *</Label>
                            <Textarea
                                id="isi"
                                placeholder="Masukkan Isi Berita Di Sini..."
                                className="min-h-[200px] resize-vertical"
                                value={formData.isi}
                                onChange={handleChange}
                                required
                                disabled={updateBerita.loading}
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={updateBerita.loading}
                        >
                            {updateBerita.loading ? "Mengupdate..." : "Update Berita"}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="text-sm text-gray-600">
                    <p>* Field wajib diisi. Teliti sebelum submit berita.</p>
                </CardFooter>
            </Card>
        </div>
    );
}