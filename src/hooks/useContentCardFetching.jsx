import { useState, useEffect } from "react";
import { getSortedByArticles } from "../api";

export const useContentCardFetching = () => {
  const [sortedArticles, setSortedArticles] = useState([]);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    const fetchArticles = async () => {
      setError(null);
      if (!isMounted) {
        setIsPageLoading(true);
      } else {
        setIsButtonLoading(true);
      }

      try {
        let articles = await getSortedByArticles("votes", currentPage, 3);

        if (articles.length > 0 && articles[0].votes < 10) {
          articles = await getSortedByArticles("comment_count", currentPage, 3);
        }

        if (!isCancelled) {
          setSortedArticles((prev) =>
            isMounted ? [...prev, ...articles] : articles
          );
        }
      } catch (err) {
        console.error(err);
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
    fetchArticles();
    return () => {
      isCancelled = true;
    };
  }, [currentPage]);

  function handleLoadMore() {
    setCurrentPage((prev) => prev + 1);
  }

  return {
    sortedArticles,
    isPageLoading,
    isButtonLoading,
    error,
    handleLoadMore,
  };
};
