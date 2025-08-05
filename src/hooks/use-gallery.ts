import { Galeri, GaleriData } from "@/type/data";
import axios from "axios";
import { useEffect, useState } from "react";

export function useCreateGaleri() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const createGaleri = async (payload: GaleriData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post(
        "https://www.web-sebatikbarat.web.id/api/gallery/upload",
        payload,
        { withCredentials: true }
      );
      setSuccess(true);
      return response.data;
    } catch (err) {
      setError(`Gagal membuat galeri ${err as Error}`);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createGaleri, loading, error, success };
}

export function useUploadGaleriImage() {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const uploadImage = async (file: File) => {
    setUploading(true);
    setUploadError(null);
    setFileUrl(null);

    const formData = new FormData();
    formData.append("png", file);

    try {
      const response = await axios.post(
        "https://www.web-sebatikbarat.web.id/api/gallery/upload-docs",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      setFileUrl(response.data.docUrl);
      return response.data.docUrl;
    } catch (err) {
      setUploadError(`Gagal mengupload gambar. ${err as Error}`);
    } finally {
      setUploading(false);
    }
  };

  return { uploadImage, uploading, uploadError, fileUrl };
}

export function useDeleteGaleri() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const deleteGaleri = async (galeriId: number) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.delete(
        `https://www.web-sebatikbarat.web.id/api/gallery/${galeriId}`,
        { withCredentials: true }
      );
      setSuccess(true);
      return response.data;
    } catch (err) {
      setError(`Gagal menghapus galeri ${err as Error}`);
    } finally {
      setLoading(false);
    }
  };

  return { deleteGaleri, loading, error, success };
}

export function useGetAllGaleri() {
  const [galeri, setGaleri] = useState<Galeri[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGaleri = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("https://www.web-sebatikbarat.web.id/api/gallery/all", {withCredentials: true});
      setGaleri(response.data);
    } catch (err) {
      setError(`Gagal mengambil data galeri ${err as Error}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGaleri();
  }, []);

  return { galeri, loading, error, refetch: fetchGaleri };
}
