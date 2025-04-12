import { useContext, useState } from "react";
import { getAllCommentsByArticleId, postCommentByArticleId } from "../api";
import { usePartialFetching } from "../hooks/usePartialFetching";
import Comment from "./Articles.comment";
import { AuthContent } from "./AuthContext";
import Button from "./Ui.button";

function CommentList({ id }) {
  const [comment, setComment] = useState("");
  const [localComments, setLocalComments] = useState([]);
  const [isPosting, setIsPosting] = useState(false);
  const [postError, setPostError] = useState(null);
  const { user } = useContext(AuthContent);
  const {
    data: comments,
    isPageLoading,
    isButtonLoading,
    error,
    handleLoadMore,
  } = usePartialFetching(getAllCommentsByArticleId, id);

  function handleSubmit(e) {
    e.preventDefault();
    setIsPosting(true);
    setPostError(null);

    postCommentByArticleId(id, user.username, comment)
      .then((newComment) => {
        setLocalComments((prev) => [newComment, ...prev]);
        setComment("");
      })
      .catch((err) => {
        console.error("Failed to post comment:", err);
        setPostError(err);
      })
      .finally(() => {
        setIsPosting(false);
      });
  }

  if (isPageLoading) return <div>Loading...</div>;
  if (error) return <div>Oops...</div>;
  return (
    <>
      <h4 className="text-sm font-thin underline my-6">Comments:</h4>
      {!user ? null : (
        <>
          <form
            className="w-full mb-18 flex flex-col items-end"
            onSubmit={handleSubmit}
          >
            <textarea
              type="textarea"
              id="postComment"
              className="border border-gray-500 rounded-sm w-full my-2 resize-none overflow-hidden p-2 break-words"
              placeholder="Leave your comment here"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              rows={1}
            />
            <Button
              className=""
              label={isPosting ? "Posting..." : "Post Comment"}
            />
          </form>
        </>
      )}

      {[...localComments, ...comments].map((comment) => {
        const { comment_id, author, body, created_at, votes, total_count } =
          comment;
        return (
          <div key={comment_id}>
            <Comment
              comment_id={comment_id}
              author={author}
              body={body}
              created_at={created_at}
              votes={votes}
              total_count={total_count}
            />
          </div>
        );
      })}
      {comments[0]?.total_count !== comments.length ? (
        <div className="flex items-center justify-center">
          <button
            className="cursor-pointer"
            onClick={() => {
              handleLoadMore();
            }}
          >
            {!isButtonLoading ? "Load More" : "Loading..."}
          </button>
        </div>
      ) : null}
    </>
  );
}

export default CommentList;
