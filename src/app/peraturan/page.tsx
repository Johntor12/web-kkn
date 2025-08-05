import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import AdminLayoutUI from "@/layout/admin-ui";
import { NamaDesa } from "@/type/data";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@radix-ui/react-select";

export default function PeraturanPage() {
    return (
        <AdminLayoutUI>
            <div className="w-full min-h-screen flex justify-center items-center">
                <div className="p-10 w-[90vw]">
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle>Tambahkan Peraturan Disini</CardTitle>
                            <CardDescription>Tambahkan Undang Undang Daerah atau Peraturan Khusus untuk Menjaga Ketertiban dan Keamanan Masayarakat</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Input type="file" className="border-none bg-none shadow-none w-full h-[32vw] bg-gray-300 rounded-md flex justify-center items-center placeholder-card-foreground" />
                                <Input type="text" placeholder="https://example.com/image?=test" disabled value={"hallo world"} />
                            </div>
                            <Input
                                id="judul"
                                type="text"
                                placeholder="Judul Berita"
                                required
                            />
                            <div className="grid gap-2">
                                <Label>Pilih Desa</Label>
                                <Select>
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
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdminLayoutUI>
    )
}