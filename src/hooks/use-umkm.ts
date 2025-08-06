import { CreateUmkmData, UpdateUmkmData } from "@/type/data";
import { GetUmkmByIdPayloadInterface, GetAllUmkmPayloadInterface } from "@/type/payload";
import axios from "axios";
import { useState } from "react";

export function useCreateUmkm<T>() {
  const [payload, setPayload] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const createUmkm = async (umkmData: CreateUmkmData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post('https://www.web-sebatikbarat.web.id/api/umkm/new', umkmData, {
        withCredentials: true,
      });
      if (res.status !== 201) throw new Error(res.data.message);
      setPayload(res.data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return { payload, loading, error, createUmkm };
}

export function useGetAllUmkm() {
  const [payload, setPayload] = useState<GetAllUmkmPayloadInterface | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const getAllUmkm = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('https://www.web-sebatikbarat.web.id/api/umkm', {
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

  return { payload, loading, error, getAllUmkm };
}

export function useGetUmkmById() {
  const [payload, setPayload] = useState<GetUmkmByIdPayloadInterface | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const getUmkmById = async (umkmId: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`https://www.web-sebatikbarat.web.id/api/umkm/${umkmId}`, {
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

  return { payload, loading, error, getUmkmById };
}

export function useGetUmkmByDesa<T>() {
  const [payload, setPayload] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const getUmkmByDesa = async (desa: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`https://www.web-sebatikbarat.web.id/api/umkm/desa/${desa}`, {
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

  return { payload, loading, error, getUmkmByDesa };
}

export function useUpdateUmkm<T>() {
  const [payload, setPayload] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const updateUmkm = async (umkmId: number, updateData: UpdateUmkmData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.put(`https://www.web-sebatikbarat.web.id/api/umkm/${umkmId}`, updateData, {
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

  return { payload, loading, error, updateUmkm };
}

export function useDeleteUmkm<T>() {
  const [payload, setPayload] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const deleteUmkm = async (umkmId: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.delete(`https://www.web-sebatikbarat.web.id/api/umkm/delete/${umkmId}`, {
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

  return { payload, loading, error, deleteUmkm };
}

export function useUmkm() {
  const createUmkm = useCreateUmkm();
  const getAllUmkm = useGetAllUmkm();
  const getUmkmById = useGetUmkmById();
  const getUmkmByDesa = useGetUmkmByDesa();
  const updateUmkm = useUpdateUmkm();
  const deleteUmkm = useDeleteUmkm();

  return {
    createUmkm,
    getAllUmkm,
    getUmkmById,
    getUmkmByDesa,
    updateUmkm,
    deleteUmkm,
  };
}