import React from "react";
import { useApiRequest } from "../../hooks/useApiRequest";
import { getSortedByArticles } from "../../api";
import ListItem from "./ListItem";

function ContentList() {
  const { data, isLoading, error } = useApiRequest(
    getSortedByArticles,
    "created_at",
    1,
    12
  );

  console.log(data);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Oops...</div>;

  return (
    <>
      <h4>Articles you might interested</h4>
      {data?.map((article) => {
        const {
          article_id,

          comment_count,
          created_at,
          title,
          topic,
          votes,
        } = article;

        return (
          <div key={article_id}>
            <ListItem
              title={title}
              topic={topic}
              created_at={created_at}
              comment_count={comment_count}
              votes={votes}
            />
          </div>
        );
      })}
    </>
  );
}

export default ContentList;
