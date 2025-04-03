import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useApiRequest } from "../hooks/useApiRequest";
import { getArticleById } from "../api";
import CommentList from "./Articles.commentList";

function Article({ sortedArticles, listData }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const {
    data: articles,
    isLoading,
    error,
  } = useApiRequest(getArticleById, id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Oops.....</div>;
  }

  if (!articles) {
    return <div>No Article found</div>;
  }

  // handle data source
  const source = location.state?.source;

  let dataSource = sortedArticles;
  dataSource = source === "list" ? listData : sortedArticles;

  const articleInd = dataSource?.findIndex(
    (item) => item.article_id === articles.article_id
  );

  const prevArticle = articleInd > 0 ? dataSource[articleInd - 1] : null;
  const nextArticle =
    articleInd < dataSource?.length - 1 ? dataSource[articleInd + 1] : null;

  const {
    article_img_url,
    author,
    body,
    comment_count,
    created_at,
    title,
    topic,
    votes,
  } = articles;

  return (
    <div>
      <div>
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </button>
        <img src={article_img_url} />
        <h3>{title}</h3>
        <ul>
          <li>{topic}</li>
          <li>{author}</li>
        </ul>
        <ul>
          <li>{created_at}</li>
          <li>{comment_count}</li>
          <li>
            <button>{votes}</button>
          </li>
        </ul>
        <p>{body}</p>
      </div>
      <div>
        <ul>
          <li>
            {!prevArticle ? null : (
              <button
                onClick={() =>
                  navigate(`/articles/${prevArticle.article_id}`, {
                    state: { source },
                  })
                }
              >
                Prev
              </button>
            )}
          </li>
          <li>
            {!nextArticle ? null : (
              <button
                onClick={() =>
                  navigate(`/articles/${nextArticle.article_id}`, {
                    state: { source },
                  })
                }
              >
                Next
              </button>
            )}
          </li>
        </ul>
      </div>
      <CommentList id={id} />
    </div>
  );
}

export default Article;
