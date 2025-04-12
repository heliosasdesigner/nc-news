import { useContext } from "react";
import { getAllCommentsByArticleId } from "../api";
import { usePartialFetching } from "../hooks/usePartialFetching";
import Comment from "./Articles.comment";
import { AuthContent } from "./AuthContext";

function CommentList({ id }) {
  const { user } = useContext(AuthContent);
  const {
    data: comments,
    isPageLoading,
    isButtonLoading,
    error,
    handleLoadMore,
  } = usePartialFetching(getAllCommentsByArticleId, id);

  if (isPageLoading) return <div>Loading...</div>;
  if (error) return <div>Oops...</div>;
  return (
    <>
      <h4 className="text-sm font-thin underline my-4">Comments:</h4>
      {!user ? null : (
        <div>
          <form>
            <label htmlFor="postComment"></label>
            <textarea
              type="textarea"
              id="postComment"
              className="border border-gray-500 rounded-sm w-full my-2 resize-none overflow-hidden p-2 break-words"
              placeholder="Leave your comment here"
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              rows={1}
            />
          </form>
        </div>
      )}

      {comments.map((comment) => {
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
