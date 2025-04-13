import { useEffect, useState } from "react";
import { formatCommentCount, formatVotes, timeAgo } from "../uilit";
import CardItem from "./Container.cardItem";
import HeroCard from "./Container.heroCard";
import LoadingScreen from "./Ui.loading";
import { getSortedByArticlesByTopic } from "../api";

function ContentCard({
  topic,
  sortedArticles,
  isPageLoading,
  isButtonLoading,
  error,
  handleLoadMore,
}) {
  let displayArticles;

  // get the number of total articles by topic
  const [topicArticle, setTopicArticle] = useState("");
  useEffect(() => {
    try {
      getSortedByArticlesByTopic(topic, "votes", 1, 1).then((data) =>
        setTopicArticle(data[0])
      );
    } catch (err) {
      console.error(err);
    }
  }, [topic]);

  if (isPageLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <div>Oops.....</div>;
  }
  const totalArticleCount = !topicArticle
    ? sortedArticles[0].total_count
    : topicArticle.total_count;

  const filteredArticlesByTopic = sortedArticles.filter(
    (article) => article.topic === topic
  );

  displayArticles =
    !topic || topic === "All" ? sortedArticles : filteredArticlesByTopic;

  if (displayArticles.length === 0) {
    return <div>There are no articles</div>;
  }

  const [heroArticle, ...otherArticles] = displayArticles;

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1600px] auto-rows-auto auto-cols-auto">
      <div className="sm:col-span-1 md:col-span-2 lg:col-span-2 lg:row-span-2">
        <HeroCard article={heroArticle} />
      </div>

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
            className=" md:max-w-[300px] lg:max-w-[600px] lg:mix-w-[500px] justify-between p-4 rounded-xl border border-[#27272A] bg-[#18181B] shadow hover:shadow-md transition-shadow duration-200"
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
      <div className="mt-6 md:col-span-3 text-center">
        {totalArticleCount >= displayArticles.length + 2 ? (
          <button onClick={() => handleLoadMore()}>
            {!isButtonLoading ? "Load More" : "Loading..."}
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default ContentCard;
