import axios from "axios";

const ncNews = axios.create({
  baseURL: "https://nc-news-soqt.onrender.com/api/",
});

export const getAllTopics = () => {
  return ncNews.get("/topics").then(({ data }) => {
    return data.topics;
  });
};

export const getAllUsers = () => {
  return ncNews.get("/users").then(({ data }) => {
    return data.users;
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

export const getArticleById = (article_id) => {
  return ncNews.get(`/articles/${article_id}`).then(({ data }) => {
    return data.article;
  });
};

export const getAllCommentsByArticleId = (article_id, page) => {
  return ncNews
    .get(`/articles/${article_id}/comments`, {
      params: {
        p: page,
      },
    })
    .then(({ data }) => {
      return data.comments;
    });
};
