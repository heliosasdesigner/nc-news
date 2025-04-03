import { getAllCommentsByArticleId } from "../api";
import { usePartialFetching } from "../hooks/usePartialFetching";
import Comment from "./Articles.comment";

function CommentList({ id }) {
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
      <h4>Comments:</h4>
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
        <button
          onClick={() => {
            handleLoadMore();
          }}
        >
          {!isButtonLoading ? "Load More" : "Loading..."}
        </button>
      ) : null}
    </>
  );
}

export default CommentList;
