import { useState } from "react";

export function useFetch<T, K>(effect: (req: K) => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchData = async (params: K) => {
    setLoading(true);
    setError("");
    try {
      const res = await effect(params);
      setData(res);
      return res;
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
}
