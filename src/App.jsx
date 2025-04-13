import { Route, Routes } from "react-router-dom";
import { getSortedByArticles } from "./api";

import Header from "./components/Header";
import LogIn from "./components/LogIn";
import Container from "./components/Container";
import Footer from "./components/Footer";
import ContentCard from "./components/Container.contentCard";
import Article from "./components/Articles.article";

import { useContentCardFetching } from "./hooks/useContentCardFetching";
import { AuthProvider } from "./components/AuthContext";
import { useState } from "react";

function App() {
  const [topic, setTopic] = useState("All");
  //Card
  const {
    data: sortedArticles,
    isPageLoading,
    isButtonLoading,
    error: cardError,
    handleLoadMore,
  } = useContentCardFetching(getSortedByArticles, {
    sortBy: "votes",
    limit: 12,
  });

  // List
  const {
    data: listData,
    isLoading: isListLoading,
    error: listError,
  } = useContentCardFetching(getSortedByArticles, {
    sortBy: "created_at",
    limit: 12,
  });

  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <div className=" w-screen  justify-center ">
              <Header topic={topic} setTopic={setTopic} />
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
              <ContentCard
                sortedArticles={sortedArticles}
                isPageLoading={isPageLoading}
                isButtonLoading={isButtonLoading}
                error={cardError}
                handleLoadMore={handleLoadMore}
              />
            }
          />

          <Route
            path="/:topic"
            element={
              <ContentCard
                topic={topic}
                sortedArticles={sortedArticles}
                isPageLoading={isPageLoading}
                isButtonLoading={isButtonLoading}
                error={cardError}
                handleLoadMore={handleLoadMore}
              />
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
    </AuthProvider>
  );
}

export default App;
