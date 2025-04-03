import React, { useEffect, useState } from "react";
import { getSortedByArticles } from "../api";
import CardItem from "./CardItem";

function ContentCard() {
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

  if (isPageLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Oops.....</div>;
  }

  return (
    <>
      {sortedArticles.map((article) => {
        const {
          article_id,
          article_img_url,

          comment_count,
          created_at,
          title,
          topic,
          total_count,
          votes,
        } = article;
        return (
          <div key={article_id}>
            <CardItem
              article_img_url={article_img_url}
              comment_count={comment_count}
              created_at={created_at}
              title={title}
              topic={topic}
              votes={votes}
            />
          </div>
        );
      })}
      {sortedArticles[0]?.total_count !== sortedArticles.length ? (
        <button onClick={() => handleLoadMore()}>
          {!isButtonLoading ? "Load More" : "Loading..."}
        </button>
      ) : null}
    </>
  );
}

export default ContentCard;
