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
import { AuthProvider } from "./components/AuthContext";

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
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <div className=" w-screen  justify-center ">
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
