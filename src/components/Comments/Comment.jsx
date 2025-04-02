import React from "react";

function Comment({ comment_id, author, body, created_at, votes, total_count }) {
  return (
    <>
      <div>
        <ul>
          <li>USER ICON</li>
          <li>
            <ul>
              <li>{author}</li>
              <li>{created_at}</li>
            </ul>
          </li>
          <li>
            <button>{votes}</button>
          </li>
        </ul>
      </div>
      <div>{body}</div>
    </>
  );
}

export default Comment;
