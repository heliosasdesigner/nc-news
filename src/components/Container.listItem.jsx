import React from "react";
import { Link, useNavigate } from "react-router-dom";

function ListItem({
  article_id,
  comment_count,
  created_at,
  title,
  topic,
  votes,
}) {
  const navigate = useNavigate();

  return (
    <div
      className="cursor-pointer"
      onClick={() =>
        navigate(`/articles/${article_id}`, { state: { source: "list" } })
      }
    >
      <div className="flex justify-between mb-2 text-xs text-gray-400 w-full min-w-[320px] ">
        <ul className="flex flex-col gap-0">
          <li className="uppercase font-bold">{topic}</li>
          <li>{created_at}</li>
        </ul>
        <ul className="flex flex-col gap-0 text-right">
          <li>{comment_count}</li>
          <li>{votes}</li>
        </ul>
      </div>
      <div>{title}</div>
    </div>
  );
}

export default ListItem;
