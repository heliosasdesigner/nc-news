import { useState, useEffect } from "react";
import { getSortedByArticles } from "../api";

export const useContentCardFetching = () => {
  const [sortedArticles, setSortedArticles] = useState([]);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrectPage] = useState(1);
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    if (!isMounted) {
      setIsPageLoading(true);
    } else {
      setIsButtonLoading(true);
    }
    setError(false);

    getSortedByArticles("votes", currentPage, 4)
      .then((articlesByVotes) => {
        if ((articlesByVotes.length > 0) & (articlesByVotes[0].votes < 10)) {
          return getSortedByArticles("comment_count", currentPage, 4);
        }

        return articlesByVotes;
      })
      .then((articlesToAdd) => {
        if (isMounted) {
          setSortedArticles((prev) => [...prev, ...articlesToAdd]);
        } else {
          setSortedArticles(articlesToAdd);
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
    setCurrectPage((prevPage) => prevPage + 1);
  }

  return {
    sortedArticles,
    isPageLoading,
    isButtonLoading,
    error,
    handleLoadMore,
  };
};
