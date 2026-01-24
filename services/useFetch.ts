import { useEffect, useState, useCallback, useRef } from "react";

const useFetch = <T, P extends any[]>(
  fetchFunction: (...args: P) => Promise<T>,
  autoFetch = true,
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Use a ref to always store the latest fetch function to avoid stale closures
  const fetchFunctionRef = useRef(fetchFunction);

  useEffect(() => {
    fetchFunctionRef.current = fetchFunction;
  }, [fetchFunction]);

  const fetchData = useCallback(async (...args: P) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetchFunctionRef.current(...args);
      setData(res);
      return res;
    } catch (err) {
      const e = err instanceof Error ? err : new Error("An Error Occurred");
      setError(e);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setLoading(false);
    setError(null);
  }, []);

  useEffect(() => {
    if (autoFetch) {
      // @ts-ignore - for autoFetch we assume no args or handled internally
      fetchData();
    }
  }, [autoFetch, fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    reset,
    Data: data,
    Loading: loading,
    Error: error,
  };
};

export default useFetch;
