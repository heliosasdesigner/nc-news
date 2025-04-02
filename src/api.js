import axios from "axios";

const ncNews = axios.create({
  baseURL: "https://nc-news-soqt.onrender.com/api/",
});

export const getAllTopics = () => {
  return ncNews.get("/topics").then(({ data }) => {
    return data.topics;
  });
};

export const getSortedByArticles = (sort_by, page, limit) => {
  return ncNews
    .get("/articles", {
      params: {
        sort_by: sort_by,
        limit: limit,
        order: "DESC",
        p: page,
      },
    })
    .then(({ data }) => {
      return data.articles;
    });
};
