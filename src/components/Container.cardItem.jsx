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
      className="cursor-pointer flex flex-col h-full "
      onClick={() =>
        navigate(`/articles/${article_id}`, { state: { source: "card" } })
      }
    >
      <div className="flex justify-between text-xs text-gray-400 ">
        <ul className="flex flex-col gap-[2px]">
          <li className="uppercase font-semibold tracking-wide">{topic}</li>
          <li>{created_at}</li>
        </ul>
        <ul className="flex flex-row gap-3 items-start">
          <li>{comment_count}</li>
          <li>{votes}</li>
        </ul>
      </div>

      <h3 className="text-lg font-medium leading-snug mg:min-h-[5.5rem] lg:min-h-[3.5rem] h-auto my-4 line-clamp-2 text-ellipsis overflow-hidden">
        {title}
      </h3>
      <img
        className="rounded-md w-full h-auto object-cover aspect-video "
        src={article_img_url}
        alt={title}
      />
    </div>
  );
}

export default CardItem;
