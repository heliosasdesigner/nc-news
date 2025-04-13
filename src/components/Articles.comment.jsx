import React, { useEffect, useState } from "react";
import { useApiRequest } from "../hooks/useApiRequest";
import { getUserByUsername } from "../api";
import { formatVotes, timeAgo } from "../uilit";
import VoteButton from "./Ui.voteButton";

function Comment({
  comment_id,
  author,
  body,
  created_at,
  votes,
  onDelete,
  isAuthor,
}) {
  const state = "comment";
  const {
    data: user,
    isLoading,
    error,
  } = useApiRequest(getUserByUsername, author);
  const [newVotes, setNewVotes] = useState(0);

  // reset the newVote to 0
  useEffect(() => {
    setNewVotes(0);
  }, [comment_id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Oops.....</div>;
  }
  const dayDifferent = timeAgo(created_at);
  const { username, name, avatar_url } = user;

  return (
    <article className=" border border-gray-800  rounded-md p-4 mb-4">
      <header className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <div className="w-10 h-10  rounded-full flex items-center justify-center mr-3 ">
            <span className="text-sm text-gray-800  ">
              <img
                className="rounded-full size-10"
                src={avatar_url}
                alt={username}
              />
            </span>
          </div>
          <div>
            <p className="font-semibold text-gray-200">{name}</p>
            <div className="flex flex-row text-xs text-gray-400 gap-3">
              <time>{dayDifferent}</time>
              {isAuthor ? (
                <button
                  onClick={onDelete}
                  className="text-xs text-red-900 underline cursor-pointer"
                >
                  Delete Comment
                </button>
              ) : null}
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-5 ">
          <div className="item-center justify-center my-auto text-xs text-gray-400">
            {formatVotes(votes + newVotes)}
          </div>
          <div>
            <VoteButton
              id={comment_id}
              state={state}
              initialVotes={votes}
              newVotes={newVotes}
              setNewVotes={setNewVotes}
            />
          </div>
        </div>
      </header>
      <p className="text-gray-200">{body}</p>
    </article>
  );
}

export default Comment;
