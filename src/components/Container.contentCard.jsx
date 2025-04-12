import { formatCommentCount, formatVotes, timeAgo } from "../uilit";
import CardItem from "./Container.cardItem";
import HeroCard from "./Container.heroCard";
import LoadingScreen from "./Ui.loading";

function ContentCard({
  sortedArticles,
  isPageLoading,
  isButtonLoading,
  error,
  handleLoadMore,
}) {
  if (isPageLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <div>Oops.....</div>;
  }
  const [heroArticle, ...otherArticles] = sortedArticles;

  return (
    <div className="flex flex-row gap-4">
      <div>
        <HeroCard article={heroArticle} />
      </div>
      <div className="flex flex-col gap-4">
        {otherArticles.map((article) => {
          const {
            article_id,
            article_img_url,
            comment_count,
            created_at,
            title,
            topic,
            votes,
          } = article;

          const dateDifferent = timeAgo(created_at);

          return (
            <div
              key={article_id}
              className="flex flex-col items-center max-w-[440px] min-h-[360px] p-4 gap-4 rounded-[12px] border border-[#27272A] bg-[#18181B] shadow-sm"
            >
              <CardItem
                article_id={article_id}
                article_img_url={article_img_url}
                comment_count={formatCommentCount(comment_count)}
                created_at={dateDifferent}
                title={title}
                topic={topic}
                votes={formatVotes(votes)}
              />
            </div>
          );
        })}
        <div className="mt-4 text-center">
          {sortedArticles[0]?.total_count !== sortedArticles.length ? (
            <button onClick={() => handleLoadMore()}>
              {!isButtonLoading ? "Load More" : "Loading..."}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default ContentCard;
