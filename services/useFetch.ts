import { useEffect, useState } from "react";

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
  const [Data, setData] = useState<T | null>();
  const [Loading, setLoading] = useState(false);
  const [Error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchFunction();
      setData(data);
    } catch (err) {
      //@ts-ignore
      setError(err instanceof Error ? err : new Error("An Error Occurred"));
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setLoading(false);
    setError(null);
  };

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, []);

  return { Data, Loading, Error, refetch: fetchData, reset };
};

export default useFetch;
