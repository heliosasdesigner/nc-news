import { useState, useEffect } from "react";

export const usePartialFetching = (apiFunction, ...args) => {
  const [data, setData] = useState([]);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    const fetchData = async () => {
      setError(null);
      // Determine page loading or button loading
      if (!isMounted) {
        setIsPageLoading(true);
      } else {
        setIsButtonLoading(true);
      }
      // Fetching Data
      try {
        const paramsArgs = [...args, currentPage];
        let data = await apiFunction(...paramsArgs);
        if (!isCancelled) {
          setData((prev) => (isMounted ? [...prev, ...data] : data));
        }
      } catch (err) {
        if (!isCancelled) {
          setError({
            status: err?.status || 500,
            message: err?.message || err,
          });
        }
      } finally {
        if (!isCancelled) {
          if (!isMounted) {
            setIsPageLoading(false);
          } else {
            setIsButtonLoading(false);
          }
          setMounted(true);
        }
      }
    };
    fetchData();

    return () => {
      isCancelled = true;
    };
  }, [currentPage]);

  function handleLoadMore() {
    setCurrentPage((prevPage) => prevPage + 1);
  }

  return {
    data,
    setData,
    isPageLoading,
    isButtonLoading,
    error,
    handleLoadMore,
  };
};
