import React from "react";
import { useNavigate } from "react-router-dom";

function CardItem({
  article_img_url,
  comment_count,
  created_at,
  title,
  topic,
  article_id,
  votes,
}) {
  const navigate = useNavigate();

  return (
    <div
      className="cursor-pointer"
      onClick={() =>
        navigate(`/articles/${article_id}`, { state: { source: "card" } })
      }
    >
      <div className="flex justify-between text-xs text-gray-400 w-full min-w-[320px] cursor-pointer">
        <ul className="flex flex-col gap-0">
          <li className="uppercase font-bold">{topic}</li>
          <li>{created_at}</li>
        </ul>
        <ul className="flex flex-row gap-4">
          <li>{comment_count}</li>
          <li>{votes}</li>
        </ul>
      </div>
      <div className="my-1.5 text-lg">{title}</div>
      <img className="rounded-sm" src={article_img_url} alt={title} />
    </div>
  );
}

export default CardItem;
