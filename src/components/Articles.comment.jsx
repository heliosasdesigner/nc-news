import React from "react";

function Comment({ author, body, created_at, votes }) {
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
