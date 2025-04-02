import { useState, useEffect } from "react";

export const usePartialFetching = (apiFunction, ...args) => {
  const [data, setData] = useState([]);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    if (!isMounted) {
      setIsPageLoading(true);
    } else {
      setIsButtonLoading(true);
    }
    setError(false);
    const paramsArgs = [...args, currentPage];
    apiFunction(...paramsArgs)
      .then((dataToAdd) => {
        if (isMounted) {
          setData((prev) => [...prev, ...dataToAdd]);
        } else {
          setData(dataToAdd);
        }
      })
      .catch((err) => {
        console.log(err);
        if (isMounted) setError(true);
      })
      .finally(() => {
        if (!isMounted) {
          setIsPageLoading(false);
        } else {
          setIsButtonLoading(false);
        }
        setMounted(true);
      });
  }, [currentPage]);

  function handleLoadMore() {
    setCurrentPage((prevPage) => prevPage + 1);
  }

  return {
    data,
    isPageLoading,
    isButtonLoading,
    error,
    handleLoadMore,
  };
};
