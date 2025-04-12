import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function ArticleNavigation({ prevArticle, nextArticle, source }) {
  const navigate = useNavigate();

  const containerClasses =
    prevArticle && nextArticle
      ? "flex justify-between items-center"
      : "flex justify-start items-center space-x-4";

  return (
    <div className={containerClasses}>
      {prevArticle && (
        <button
          onClick={() =>
            navigate(`/articles/${prevArticle.article_id}`, {
              state: { source },
            })
          }
          className="flex items-center space-x-2 px-4 py-2 cursor-pointer"
        >
          <FaArrowLeft />
          <span>Prev</span>
        </button>
      )}
      {nextArticle && (
        <button
          onClick={() =>
            navigate(`/articles/${nextArticle.article_id}`, {
              state: { source },
            })
          }
          className="flex items-center space-x-2 px-4 py-2 cursor-pointer"
        >
          <span>Next</span>
          <FaArrowRight />
        </button>
      )}
    </div>
  );
}

export default ArticleNavigation;
