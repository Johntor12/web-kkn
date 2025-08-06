import { useState } from "react";
import axios, { AxiosError } from "axios";
import { CreateAdminPayload, UpdateUserPayload } from "@/type/data";

export function useUpdateUserData() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const updateUser = async (payload: UpdateUserPayload) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.put(
        "https://www.web-sebatikbarat.web.id/ api/user/profile",
        payload,
        { withCredentials: true }
      );

      setSuccess(true);
      return response.data;
    } catch (err) {
      setError(`Gagal update user ${err as Error}`);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    updateUser,
    loading,
    error,
    success,
  };
}

export function useCreateAdminAccount() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const createAdmin = async (payload: CreateAdminPayload) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post(
        "https://www.web-sebatikbarat.web.id/ api/user/newadmin",
        payload,
        { withCredentials: true }
      );
      setSuccess(true);
      return response.data;
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      const message =
        axiosError.response?.data?.message || "Gagal membuat akun admin.";
      setError(message);
      throw new Error(message); // bisa ditangani di komponen dengan try-catch
    } finally {
      setLoading(false);
    }
  };

  return {
    createAdmin,
    loading,
    error,
    success,
  };
}