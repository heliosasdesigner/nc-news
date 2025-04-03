import { Route, Routes } from "react-router-dom";
import { useContentCardFetching } from "../hooks/useContentCardFetching";
import { useApiRequest } from "../hooks/useApiRequest";
import { getSortedByArticles } from "../api";
import ContentCard from "./ContentCard";
import ContentList from "./ContentList";
import Article from "./Article";

function Container() {
  //Card
  const {
    sortedArticles,
    isPageLoading,
    isButtonLoading,
    error: cardError,
    handleLoadMore,
  } = useContentCardFetching();
  // List
  const {
    data: listData,
    isLoading,
    error: listError,
  } = useApiRequest(getSortedByArticles, "created_at", 1, 12);

  return (
    <main>
      <Routes>
        <Route
          path="/"
          element={
            <section>
              <ContentCard
                sortedArticles={sortedArticles}
                isPageLoading={isPageLoading}
                isButtonLoading={isButtonLoading}
                error={cardError}
                handleLoadMore={handleLoadMore}
              />
            </section>
          }
        />

        <Route
          path="/articles/:id"
          element={
            <section>
              <Article sortedArticles={sortedArticles} listData={listData} />
            </section>
          }
        />
      </Routes>
      <section>
        <ContentList
          listData={listData}
          isLoading={isLoading}
          listError={listError}
        />
      </section>
    </main>
  );
}

export default Container;
