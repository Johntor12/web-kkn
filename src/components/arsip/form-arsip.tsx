import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CreateArsipData, JenisArsip, NamaDesa } from "@/type/data";
import { useUploadAndCreateArsip } from "@/hooks/use-arsip";

export function FormArsip({ onSuccess }: { onSuccess?: () => void }) {
  const { uploadAndCreate, loading } = useUploadAndCreateArsip();
  const [formData, setFormData] = React.useState<Omit<CreateArsipData, "fileUrl">>({
    jenisArsip: "",
    judul: "",
    desa: "",
  });
  const [pdfFile, setPdfFile] = React.useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPdfFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pdfFile) {
      toast.error("File PDF belum dipilih");
      return;
    }

    try {
      await uploadAndCreate(formData, pdfFile);
      setFormData({ judul: "", desa: "", jenisArsip: "" });
      setPdfFile(null);
      toast.success("Berhasil membuat arsip!");
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Gagal membuat arsip:", error);
      toast.error("Gagal membuat arsip");
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <Input
        id="judul"
        type="text"
        placeholder="Judul Arsip"
        value={formData.judul}
        onChange={handleChange}
        required
      />

      <Input
        id="file"
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        required
      />

      {/* ✅ Pilih Desa */}
      <Select
        value={formData.desa}
        onValueChange={(value) => setFormData({ ...formData, desa: value })}
      >
        <SelectTrigger className="w-full border border-gray-300 rounded-sm">
          <SelectValue placeholder="Pilih Desa" />
        </SelectTrigger>
        <SelectContent className="bg-white border border-gray-300 rounded-md p-2">
          <SelectGroup>
            <SelectLabel>Desa</SelectLabel>
            {Object.values(NamaDesa).map((desa) => (
              <SelectItem key={desa} value={desa}>
                {desa}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* ✅ Pilih Jenis Arsip */}
      <Select
        value={formData.jenisArsip}
        onValueChange={(value) => setFormData({ ...formData, jenisArsip: value })}
      >
        <SelectTrigger className="w-full border border-gray-300 rounded-sm">
          <SelectValue placeholder="Pilih Jenis Arsip" />
        </SelectTrigger>
        <SelectContent className="bg-white border border-gray-300 rounded-md p-2">
          <SelectGroup>
            <SelectLabel>Jenis Arsip</SelectLabel>
            {Object.values(JenisArsip).map((jenis) => (
              <SelectItem key={jenis} value={jenis}>
                {jenis.replace(/_/g, " ").toLowerCase().replace(/(^|\s)\S/g, (l) => l.toUpperCase())}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button type="submit" className="w-full cursor-pointer" disabled={loading}>
        {loading ? "Mengunggah..." : "Buat"}
      </Button>

      <div className="font-semibold mt-4">
        **Teliti sebelum submit arsip
      </div>
    </form>
  );
}
