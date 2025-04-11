import React from "react";
import { formatCommentCount, formatVotes, timeAgo } from "../uilit";
import { useNavigate } from "react-router-dom";

function HeroCard({ article }) {
  const navigate = useNavigate();
  const {
    article_id,
    article_img_url,
    title,
    topic,
    created_at,
    comment_count,
    votes,
  } = article;

  const heroDateDifferent = timeAgo(created_at);

  return (
    <div
      onClick={() =>
        navigate(`/articles/${article_id}`, { state: { source: "card" } })
      }
      className="cursor-pointer max-w-[1000px] w-[1000px] "
    >
      <img className="rounded-sm w-full" src={article_img_url} alt={title} />
      <h1 className="text-6xl font-extralight mt-8">{title}</h1>
      <div className="flex justify-between text-xs text-gray-200 w-full mt-3">
        <ul className="flex flex-row gap-4">
          <li className="uppercase font-bold">{topic}</li>
          <li>{heroDateDifferent}</li>
        </ul>
        <ul className="flex flex-row gap-4">
          <li>{formatCommentCount(comment_count)}</li>
          <li>{formatVotes(votes)}</li>
        </ul>
      </div>
    </div>
  );
}

export default HeroCard;
