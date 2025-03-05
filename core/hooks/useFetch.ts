/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";

export function useFetch<T>(effect: any, params: any) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchData = async () => {
    setLoading(true);
    setError(""); // Reset lỗi trước mỗi lần gọi API
    console.log("effect", effect);
    console.log("params", params);
    try {
      const res = await effect(params);
      if (!res.status) throw new Error("Không thể lấy dữ liệu");
      setData(res);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
}
