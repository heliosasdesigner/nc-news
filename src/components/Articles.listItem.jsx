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
      onClick={() =>
        navigate(`/articles/${article_id}`, { state: { source: "list" } })
      }
    >
      <div>{title}</div>
      <div>{topic}</div>
      <div>{created_at}</div>
      <div>{comment_count}</div>
      <div>{votes}</div>
    </div>
  );
}

export default ListItem;
