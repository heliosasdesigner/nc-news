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
      className="cursor-pointer w-full"
    >
      <img
        className="rounded-md w-full h-auto object-cover max-h-[500px] md:max-h-[600px] lg:max-h-[800px]"
        src={article_img_url}
        alt={title}
      />

      <h1 className="text-3xl md:text-4xl lg:text-5xl font-light mt-4 md:mt-6 leading-snug md:leading-tight">
        {title}
      </h1>

      <div className="flex justify-between text-xs text-gray-400 w-full mt-3 flex-wrap gap-y-1">
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
