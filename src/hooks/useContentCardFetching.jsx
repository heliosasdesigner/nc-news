import { useState, useEffect } from "react";

export const useContentCardFetching = (apiFunction, options = {}) => {
  const { sortBy, limit } = options;

  const [data, setData] = useState([]);
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
        let articles = await apiFunction(sortBy, currentPage, limit);

        if (!isCancelled) {
          setData((prev) => {
            const filteredNewArticles = articles.filter(
              (article) =>
                !prev.some(
                  (prevArticle) => prevArticle.article_id === article.article_id
                )
            );
            return isMounted
              ? [...prev, ...filteredNewArticles]
              : filteredNewArticles;
          });
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
  }, [currentPage, sortBy, limit, isMounted]);

  function handleLoadMore() {
    setCurrentPage((prev) => prev + 1);
  }

  return {
    data,
    isPageLoading,
    isButtonLoading,
    error,
    handleLoadMore,
  };
};
