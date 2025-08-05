'use client';

import AuthContext from "@/context-provider/auth-context";
import { AuthContextInterface, NamaDesa } from "@/type/data";
import React from "react";
import { Loader } from "../loader";
import { Edit2Icon, LucideIcon, PlusCircle } from "lucide-react";
import { Dialog, DialogHeader, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { useCreateAdminAccount, useUpdateUserData } from "@/hooks/use-user";

import { AxiosError } from "axios";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";


export function UserInfo() {
    const { user, loading } = React.useContext<AuthContextInterface>(AuthContext);

    if (loading) return <Loader />

    return (
        <div className="p-5">
            <div className="border-1 border-gray-300 w-full p-5 rounded-md space-y-5">
                <div className="flex justify-between">
                    <div className="flex space-x-2">
                        <h1>Selamat Datang</h1>
                        <span className="font-semibold">{user?.username}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <EditUserDialog />
                        <AddAdminDialog />
                    </div>
                </div>
                <div className="flex space-x-10">
                    <div className="space-y-2 w-full">
                        <p className="text-xl">Data Akun Anda</p>
                        <div className="flex w-full items-center justify-between">
                            <p className="">usernamae:</p>
                            <p>{user?.username}</p>
                        </div>
                        <div className="flex w-full items-center justify-between">
                            <p className="">email:</p>
                            <p className={`${!user?.email ? 'font-semibold text-sm' : ''}`}>{user?.email ?? "tidak ada email terdaftar"}</p>
                        </div>
                        <div className="flex w-full items-center justify-between">
                            <p className="">admin id:</p>
                            <p>{user?.id}</p>
                        </div>
                        <div className="flex w-full items-center justify-between">
                            <p className="">password:</p>
                            <p className="font-mono">*****************</p>
                        </div>
                    </div>
                    <div className="space-y-4 w-[50vw]">
                        <p className="uppercase font-semibold">Daftar Desa</p>
                        <div className="space-y-1">
                            {Object.values(NamaDesa).map((desa) => (
                                <p key={desa}>{desa}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function InfoStatisticAdminUser({
    title,
    total,
    color,
    icon: Icon,
}: {
    title: string
    total: number
    color: string
    icon: LucideIcon
}) {
    return (
        <div className="p-4">
            <div className="border border-gray-200 rounded-lg p-5 space-y-4 shadow-sm bg-white">
                <h3 className="text-gray-700 font-medium">{title}</h3>
                <div className={`flex items-center justify-between p-4 rounded-md text-white`} style={{ backgroundColor: color }}>
                    <Icon className="w-6 h-6" />
                    <span className="text-lg font-semibold">{total}</span>
                </div>
            </div>
        </div>
    )
}

export function EditUserDialog() {
    const [open, setOpen] = React.useState(false);

    const [newusername, setNewUsername] = React.useState("");
    const [oldpassword, setOldPassword] = React.useState("");
    const [newpassword, setNewPassword] = React.useState("");

    const { updateUser, loading } = useUpdateUserData();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await updateUser({ newusername, oldpassword, newpassword });
            toast.success("Akun berhasil diperbarui. Silakan login ulang.");
            setOpen(false);
            setNewPassword("");
            setOldPassword("");
            setNewUsername("");
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const message =
                error.response?.data?.message || "Terjadi kesalahan saat memperbarui akun.";
            toast.error(`Gagal memperbarui akun: ${message}`);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <Edit2Icon className="w-4 h-4" />
                    <span>Edit Akun</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl w-full">
                <DialogHeader>
                    <DialogTitle>Edit Akun</DialogTitle>
                    <DialogDescription>
                        Silakan isi form berikut untuk memperbarui akun Anda.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="space-y-2">
                        <Label htmlFor="newusername">Username Baru</Label>
                        <Input
                            id="newusername"
                            placeholder="Masukkan Username Baru"
                            type="text"
                            value={newusername}
                            onChange={(e) => setNewUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="oldpassword">Password Lama</Label>
                        <Input
                            id="oldpassword"
                            placeholder="Masukkan Password Lama"
                            type="password"
                            value={oldpassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="newpassword">Password Baru</Label>
                        <Input
                            id="newpassword"
                            placeholder="Masukkan Password Baru"
                            type="password"
                            value={newpassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <Button type="submit" disabled={loading} className="w-full">
                        {loading ? "Memperbarui..." : "Perbarui Akun"}
                    </Button>
                    <Label className="block text-sm text-muted-foreground text-center">
                        Setelah memperbarui akun, silakan login ulang.
                    </Label>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export function AddAdminDialog() {
    const [open, setOpen] = React.useState(false);

    const [form, setForm] = React.useState({
        username: "",
        email: "",
        password: "",
        status: "",
        desa: "",
    });

    const { createAdmin, loading } = useCreateAdminAccount();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createAdmin(form);
            toast.success("Admin berhasil dibuat");
            setOpen(false);
            setForm({ username: "", email: "", password: "", status: "", desa: "" });
        } catch (err) {
            toast.error((err as Error).message);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <PlusCircle className="w-4 h-4" />
                    <span>Tambah Admin</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl w-full">
                <DialogHeader>
                    <DialogTitle>Tambah Akun Admin</DialogTitle>
                    <DialogDescription>
                        Silakan isi form berikut untuk menambahkan akun admin baru.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            placeholder="Username"
                            value={form.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            placeholder="Email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            placeholder="Password"
                            type="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Input
                            id="status"
                            placeholder="Status (aktif / tidak aktif)"
                            value={form.status}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="desa">Desa</Label>
                        <Select
                            value={form.desa}
                            onValueChange={(value) => setForm({ ...form, desa: value })}
                            required
                        >
                            <SelectTrigger className="w-full border border-gray-300">
                                <SelectValue placeholder="Pilih Desa" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={NamaDesa.binalawan}>Binalawan</SelectItem>
                                <SelectItem value={NamaDesa.enreukan}>Enreukan</SelectItem>
                                <SelectItem value={NamaDesa.liangbunyu}>Liang Bunyu</SelectItem>
                                <SelectItem value={NamaDesa.setabu}>Setabu</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button type="submit" disabled={loading} className="w-full">
                        {loading ? "Membuat Admin..." : "Buat Akun Admin"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}