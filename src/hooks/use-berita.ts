import { CreateBeritaData, UpdateBeritaData } from "@/type/data";
import { GetBeritaByIdPayloadInterface, GetMyBeritaPayloadInterface } from "@/type/payload";
import axios from "axios";
import { useState } from "react";


export function useCreateBerita<T>() {
  const [payload, setPayload] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const createBerita = async (beritaData: CreateBeritaData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post('https://www.web-sebatikbarat.web.id/ api/news/new', beritaData, {
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

  return { payload, loading, error, createBerita };
}

export function useGetBeritaById() {
  const [payload, setPayload] = useState<GetBeritaByIdPayloadInterface | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const getBeritaById = async (beritaId: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`https://www.web-sebatikbarat.web.id/ api/news/berita/${beritaId}`, {
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

  return { payload, loading, error, getBeritaById };
}

export function useSearchBerita<T>() {
  const [payload, setPayload] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const searchBerita = async (keyword: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`https://www.web-sebatikbarat.web.id/ api/news/search?keyword=${keyword}`, {
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

  return { payload, loading, error, searchBerita };
}

export function useGetBeritaByDesa<T>() {
  const [payload, setPayload] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const getBeritaByDesa = async (desa: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`https://www.web-sebatikbarat.web.id/ api/news/desa/${desa}`, {
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

  return { payload, loading, error, getBeritaByDesa };
}

export function useUpdateBerita<T>() {
  const [payload, setPayload] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const updateBerita = async (beritaId: number, updateData: UpdateBeritaData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.put(`https://www.web-sebatikbarat.web.id/ api/news/${beritaId}`, updateData, {
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

  return { payload, loading, error, updateBerita };
}

export function useDeleteBerita<T>() {
  const [payload, setPayload] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const deleteBerita = async (beritaId: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.delete(`https://www.web-sebatikbarat.web.id/ api/news/${beritaId}`, {
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

  return { payload, loading, error, deleteBerita };
}

export function useGetMyBerita() {
  const [payload, setPayload] = useState<GetMyBeritaPayloadInterface | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const getMyBerita = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('https://www.web-sebatikbarat.web.id/ api/news/all', {
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

  return { payload, loading, error, getMyBerita };
}

export function useBerita() {
  const createBerita = useCreateBerita();
  const getBeritaById = useGetBeritaById();
  const searchBerita = useSearchBerita();
  const getBeritaByDesa = useGetBeritaByDesa();
  const updateBerita = useUpdateBerita();
  const deleteBerita = useDeleteBerita();
  const getMyBerita = useGetMyBerita();

  return {
    createBerita,
    getBeritaById,
    searchBerita,
    getBeritaByDesa,
    updateBerita,
    deleteBerita,
    getMyBerita,
  };
}