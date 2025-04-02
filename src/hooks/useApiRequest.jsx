import { useEffect, useState } from "react";

export const useApiRequest = (apiFunction, ...args) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(false);
    setIsLoading(true);

    apiFunction(...args)
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.log(err);
        setError({ status: 404, message: err });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [...args]);

  return { data, isLoading, error };
};
