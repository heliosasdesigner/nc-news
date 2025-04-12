import { useLocation, useParams } from "react-router-dom";
import { useApiRequest } from "../hooks/useApiRequest";
import { getArticleById } from "../api";
import CommentList from "./Articles.commentList";
import { formatCommentCount, formatVotes, timeAgo } from "../uilit";
import BackButton from "./Ui.backButton";
import ArticleNavigation from "./ArticleNavigation";
import VoteButton from "./Ui.voteButton";
import { useEffect, useState } from "react";

function Article({ sortedArticles, listData }) {
  const state = "article";
  const location = useLocation();
  const { id } = useParams();
  const { data: article, isLoading, error } = useApiRequest(getArticleById, id);

  const [newVotes, setNewVotes] = useState(0);

  // reset the newVote to 0
  useEffect(() => {
    setNewVotes(0);
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Oops.....</div>;
  }

  if (!article) {
    return <div>No Article found</div>;
  }

  // handle data source
  const source = location.state?.source;

  let dataSource = source === "list" ? listData : sortedArticles;

  const articleInd = dataSource?.findIndex(
    (item) => item.article_id === article.article_id
  );

  const prevArticle = articleInd > 0 ? dataSource[articleInd - 1] : null;
  const nextArticle =
    articleInd < dataSource?.length - 1 ? dataSource[articleInd + 1] : null;

  // destructure article object
  const {
    article_img_url,
    author,
    body,
    comment_count,
    created_at,
    title,
    topic,
    votes,
  } = article;
  const dateDifferent = timeAgo(created_at);

  return (
    <div className="w-[800px] ">
      <div className="mb-4">
        <BackButton />
        <img className="w-[800px] my-3 rounded-sm" src={article_img_url} />
        <h3 className="text-4xl my-8 font-thin">{title}</h3>
        <div className="flex justify-between mb-6 text-xs text-gray-400 w-full min-w-[320px]">
          <ul className="flex flex-col gap-0 my-4">
            <li className="uppercase font-bold">
              {topic} <span className="mx-4">|</span> by {author}
            </li>
            <li>{dateDifferent}</li>
          </ul>
          <ul className="flex flex-row gap-4 text-right ">
            <li className="my-auto">{formatCommentCount(comment_count)}</li>
            <li className="my-auto"> {formatVotes(votes + newVotes)}</li>
            <li className="my-auto">
              <VoteButton
                id={id}
                state={state}
                initialVotes={votes}
                newVotes={newVotes}
                setNewVotes={setNewVotes}
              />
            </li>
          </ul>
        </div>

        <p>{body}</p>
      </div>
      <div className="mb-12">
        <ArticleNavigation
          prevArticle={prevArticle}
          nextArticle={nextArticle}
          source={source}
        />
      </div>
      <CommentList id={id} />
    </div>
  );
}

export default Article;
