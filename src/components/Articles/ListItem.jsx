import React from "react";

function ListItem({ comment_count, created_at, title, topic, votes }) {
  return (
    <>
      <div>{title}</div>
      <div>{topic}</div>
      <div>{created_at}</div>
      <div>{comment_count}</div>
      <div>{votes}</div>
    </>
  );
}

export default ListItem;
