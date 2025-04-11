import React from "react";
import ListItem from "./Container.listItem";
import { formatCommentCount, formatVotes, timeAgo } from "../uilit";

function ContentList({ listData, isLoading, listError }) {
  if (isLoading) return <div>Loading...</div>;
  if (listError) return <div>Oops...</div>;

  return (
    <>
      <h4 className="text-xl mt-10 mb-6 underline font-thin">
        Articles you might interested
      </h4>
      <div className="flex flex-row overflow-x-auto gap-12">
        {listData?.map((article) => {
          const { article_id, comment_count, created_at, title, topic, votes } =
            article;
          const dayDifferent = timeAgo(created_at);

          return (
            <div key={article_id} className="min-w-[312px] w-[320px] ">
              <ListItem
                article_id={article_id}
                title={title}
                topic={topic}
                created_at={dayDifferent}
                comment_count={formatCommentCount(comment_count)}
                votes={formatVotes(votes)}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ContentList;
