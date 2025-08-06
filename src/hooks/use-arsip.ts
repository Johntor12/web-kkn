import { CreateArsipData, UpdateArsipData } from "@/type/data";
import {
  GetArsipByIdPayloadInterface,
  GetAllArsipPayloadInterface,
} from "@/type/payload";
import axios from "axios";
import { useState } from "react";

export function useCreateArsip<T>() {
  const [payload, setPayload] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const createArsip = async (arsipData: CreateArsipData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(
        "https://www.web-sebatikbarat.web.id/api/arsip/new",
        arsipData,
        {
          withCredentials: true,
        }
      );
      if (res.status !== 201) throw new Error(res.data.message);
      setPayload(res.data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return { payload, loading, error, createArsip };
}

export function useGetAllArsip() {
  const [payload, setPayload] = useState<GetAllArsipPayloadInterface | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const getAllArsip = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("https://www.web-sebatikbarat.web.id/api/arsip", {
        withCredentials: true,
      });
      if (res.status !== 200) throw new Error(res.data.message);
      setPayload(res.data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return { payload, loading, error, getAllArsip };
}

export function useGetArsipById() {
  const [payload, setPayload] = useState<GetArsipByIdPayloadInterface | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const getArsipById = async (arsipId: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `https://www.web-sebatikbarat.web.id/api/arsip/${arsipId}`,
        {
          withCredentials: true,
        }
      );
      if (res.status !== 200) throw new Error(res.data.message);
      setPayload(res.data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return { payload, loading, error, getArsipById };
}

export function useGetArsipByDesa<T>() {
  const [payload, setPayload] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const getArsipByDesa = async (desa: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `https://www.web-sebatikbarat.web.id/api/arsip/desa/${desa}`,
        {
          withCredentials: true,
        }
      );
      if (res.status !== 200) throw new Error(res.data.message);
      setPayload(res.data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return { payload, loading, error, getArsipByDesa };
}

export function useGetArsipByJenis<T>() {
  const [payload, setPayload] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const getArsipByJenis = async (jenis: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `https://www.web-sebatikbarat.web.id/api/arsip/jenis/${jenis}`,
        {
          withCredentials: true,
        }
      );
      if (res.status !== 200) throw new Error(res.data.message);
      setPayload(res.data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return { payload, loading, error, getArsipByJenis };
}

export function useUpdateArsip<T>() {
  const [payload, setPayload] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const updateArsip = async (arsipId: number, updateData: UpdateArsipData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.put(
        `https://www.web-sebatikbarat.web.id/api/arsip/${arsipId}`,
        updateData,
        {
          withCredentials: true,
        }
      );
      if (res.status !== 200) throw new Error(res.data.message);
      setPayload(res.data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return { payload, loading, error, updateArsip };
}

export function useDeleteArsip<T>() {
  const [payload, setPayload] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const deleteArsip = async (arsipId: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.delete(
        `https://www.web-sebatikbarat.web.id/api/arsip/delete/${arsipId}`,
        {
          withCredentials: true,
        }
      );
      if (res.status !== 200) throw new Error(res.data.message);
      setPayload(res.data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return { payload, loading, error, deleteArsip };
}

export function useUploadAndCreateArsip<T>() {
  const [payload, setPayload] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const uploadAndCreate = async (arsipData: Omit<CreateArsipData, "fileUrl">, file: File) => {
    setLoading(true);
    setError(null);

    try {
      // 1. Upload file ke Google Drive
      const formData = new FormData();
      formData.append("pdf", file);

      const uploadRes = await axios.post(
        "https://www.web-sebatikbarat.web.id/api/arsip/upload-docs",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (uploadRes.status !== 200 || !uploadRes.data.docUrl) {
        throw new Error("Gagal mengupload file PDF");
      }

      const arsipRes = await axios.post(
        "https://www.web-sebatikbarat.web.id/api/arsip/new",
        {
          ...arsipData,
          fileUrl: uploadRes.data.docUrl,
        },
        { withCredentials: true }
      );

      if (arsipRes.status !== 201) {
        throw new Error(arsipRes.data.message);
      }

      setPayload(arsipRes.data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return { payload, loading, error, uploadAndCreate };
}

export function useArsip() {
  const createArsip = useCreateArsip();
  const getAllArsip = useGetAllArsip();
  const getArsipById = useGetArsipById();
  const getArsipByDesa = useGetArsipByDesa();
  const getArsipByJenis = useGetArsipByJenis();
  const updateArsip = useUpdateArsip();
  const deleteArsip = useDeleteArsip();

  return {
    createArsip,
    getAllArsip,
    getArsipById,
    getArsipByDesa,
    getArsipByJenis,
    updateArsip,
    deleteArsip,
  };
}
