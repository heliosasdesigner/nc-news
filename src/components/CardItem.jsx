import React from "react";

function CardItem({
  article_img_url,
  comment_count,
  created_at,
  title,
  topic,

  votes,
}) {
  return (
    <>
      <div>{title}</div>
      <div>{topic}</div>
      <div>{created_at}</div>
      <div>{comment_count}</div>
      <div>{votes}</div>
      <img src={article_img_url} alt={title} />
    </>
  );
}

export default CardItem;
