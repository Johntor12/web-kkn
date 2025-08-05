import axios, { AxiosError } from "axios";
import { useState } from "react";

export function useLogin<T>() {
  const [payload, setPayload] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const login = async (url: string, username: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(
        url,
        { identifier: username, password },
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

  return { payload, loading, error, login };
}

export function useLogout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const logout = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.delete(
        "http://localhost:4000/api/auth/logout", // pastikan sesuai endpoint
        { withCredentials: true }
      );
      return response.data.message;
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      const message = axiosError.response?.data?.message || "Gagal logout";
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return { logout, loading, error };
}