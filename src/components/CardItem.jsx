import React from "react";
import { Link, useNavigate } from "react-router-dom";

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
      onClick={() =>
        navigate(`/articles/${article_id}`, { state: { source: "card" } })
      }
    >
      <div>{title}</div>
      <div>{topic}</div>
      <div>{created_at}</div>
      <div>{comment_count}</div>
      <div>{votes}</div>
      <img src={article_img_url} alt={title} />
    </div>
  );
}

export default CardItem;
