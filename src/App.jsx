import { Route, Routes } from "react-router-dom";
import { getSortedByArticles } from "./api";

import Header from "./components/Header";
import LogIn from "./components/LogIn";
import Container from "./components/Container";
import Footer from "./components/Footer";
import ContentCard from "./components/Container.contentCard";
import Article from "./components/Articles.article";

import { useContentCardFetching } from "./hooks/useContentCardFetching";
import { useApiRequest } from "./hooks/useApiRequest";

function App() {
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
    isLoading: isListLoading,
    error: listError,
  } = useApiRequest(getSortedByArticles, "created_at", 1, 12);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <div className="container dark:text-3xl light:text-xl font-bold underline">
              <Header />
              <Container
                listData={listData}
                isListLoading={isListLoading}
                listError={listError}
              />
              <Footer />
            </div>
          }
        >
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
        </Route>
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </>
  );
}

export default App;
