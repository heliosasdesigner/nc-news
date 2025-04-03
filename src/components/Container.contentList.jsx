import React from "react";
import ListItem from "./Articles.listItem";

function ContentList({ listData, isLoading, listError }) {
  if (isLoading) return <div>Loading...</div>;
  if (listError) return <div>Oops...</div>;

  return (
    <>
      <h4>Articles you might interested</h4>
      {listData?.map((article) => {
        const { article_id, comment_count, created_at, title, topic, votes } =
          article;

        return (
          <div key={article_id}>
            <ListItem
              article_id={article_id}
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
