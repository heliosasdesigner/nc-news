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

export const getUserByUsername = (username) => {
  return ncNews.get(`/users/${username}`).then(({ data }) => {
    return data.user;
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

export const getSortedByArticlesByTopic = (topic, sort_by, page, limit) => {
  return ncNews
    .get("/articles", {
      params: {
        topic: topic,
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

export const postCommentByArticleId = (article_id, username, content) => {
  return ncNews
    .post(`/articles/${article_id}/comments`, {
      username: username,
      body: content,
    })
    .then(({ data }) => {
      return data.comment;
    });
};

export const deleteCommentByCommentId = (comment_id) => {
  return ncNews.delete(`/comments/${comment_id}`).then(({ data }) => {
    console.log(data);
    return data;
  });
};

export const patchArticlesVote = (article_id, votes) => {
  return ncNews
    .patch(`/articles/${article_id}`, { inc_votes: votes })
    .then(({ data }) => {
      return data.article;
    });
};

export const patchCommentVote = (comment_id, votes) => {
  return ncNews
    .patch(`/comments/${comment_id}`, { inc_votes: votes })
    .then(({ data }) => {
      return data.comment;
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
