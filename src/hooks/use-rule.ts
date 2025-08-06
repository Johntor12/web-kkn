import { useState } from "react";
import axios from "axios";
import {
  GetRuleByDesaPayloadInterface,
  GetRuleByIdPayloadInterface,
} from "@/type/payload";

export function useGetRuleById() {
  const [payload, setPayload] = useState<GetRuleByIdPayloadInterface | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const getBeritaById = async (beritaId: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `https://www.web-sebatikbarat.web.id/api/peraturan/${beritaId}`,
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

  return { payload, loading, error, getBeritaById };
}

export function useGetRuleByDesa() {
  const [payload, setPayload] = useState<GetRuleByDesaPayloadInterface | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const getRuleByDesa = async (desa: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `https://www.web-sebatikbarat.web.id/api/peraturan/desa/${desa}`,
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

  return { payload, loading, error, getRuleByDesa };
}

export function useUploadToGoogleDrive() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [payload, setPayload] = useState<{
    message: string;
    docUrl: string;
  } | null>(null);

  const uploadDocument = async (file: File) => {
    setLoading(true);
    setError(null);
    setPayload(null);

    try {
      const formData = new FormData();
      formData.append("pdf", file);

      const res = await axios.post(
        "https://www.web-sebatikbarat.web.id/api/peraturan/upload-docs",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status !== 200)
        throw new Error(res.data.error || res.data.message);
      setPayload(res.data);
      return res.data;
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return { payload, loading, error, uploadDocument };
}

export function useCreateNewRule() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [payload, setPayload] = useState<{
    judul: string;
    fileUrl: string;
    desa: string;
  } | null>(null);

  const createRule = async (data: {
    judul: string;
    fileUrl: string;
    desa: string;
  }) => {
    setLoading(true);
    setError(null);
    setPayload(null);

    try {
      const res = await axios.post(
        "https://www.web-sebatikbarat.web.id/api/peraturan/upload",
        data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status !== 201) throw new Error(res.data.message);
      setPayload(res.data);
      return res.data;
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return { payload, loading, error, createRule };
}

export function usePeraturan() {
  const getRuleById = useGetRuleById();
  const getRuleByDesa = useGetRuleByDesa();
  const uploadToGoogleDrive = useUploadToGoogleDrive();
  const createNewRule = useCreateNewRule();

  return {
    getRuleById,
    getRuleByDesa,
    uploadToGoogleDrive,
    createNewRule,
  };
}
