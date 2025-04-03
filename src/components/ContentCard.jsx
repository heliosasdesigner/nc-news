import CardItem from "./CardItem";

function ContentCard({
  sortedArticles,
  isPageLoading,
  isButtonLoading,
  error,
  handleLoadMore,
}) {
  if (isPageLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Oops.....</div>;
  }

  return (
    <>
      {sortedArticles.map((article) => {
        const {
          article_id,
          article_img_url,

          comment_count,
          created_at,
          title,
          topic,

          votes,
        } = article;
        return (
          <div key={article_id}>
            <CardItem
              article_id={article_id}
              article_img_url={article_img_url}
              comment_count={comment_count}
              created_at={created_at}
              title={title}
              topic={topic}
              votes={votes}
            />
          </div>
        );
      })}
      {sortedArticles[0]?.total_count !== sortedArticles.length ? (
        <button onClick={() => handleLoadMore()}>
          {!isButtonLoading ? "Load More" : "Loading..."}
        </button>
      ) : null}
    </>
  );
}

export default ContentCard;
