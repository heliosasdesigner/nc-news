import { useEffect, useState } from "react";

export const useApiRequest = (apiFunction, ...args) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    const fetchData = async () => {
      try {
        setError(null);
        setIsLoading(true);

        const result = await apiFunction(...args);

        if (!isCancelled) setData(result);
      } catch (err) {
        if (!isCancelled) {
          console.error(err);
          setError({
            status: err?.status || 500,
            message: err?.message || err,
          });
        }
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    };
    fetchData();

    return () => {
      isCancelled = true;
    };
  }, [...args]);

  return { data, isLoading, error };
};
