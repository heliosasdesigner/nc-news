export const timeAgo = (dateString) => {
  const createdDate = new Date(dateString);
  const now = new Date();
  const diffInMinutes = (now - createdDate) / (1000 * 60);

  if (diffInMinutes < 1) return "Just now";
  if (diffInMinutes < 60) {
    const mins = Math.floor(diffInMinutes);
    return `${mins} ${mins === 1 ? "min" : "mins"} ago`;
  }

  const diffInHours = diffInMinutes / 60;
  if (diffInHours < 24) {
    const hours = Math.floor(diffInHours);
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  }

  const diffInDays = diffInHours / 24;
  if (diffInDays < 7) {
    const days = Math.floor(diffInDays);
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  }

  const diffInWeeks = diffInDays / 7;
  if (diffInWeeks < 4) {
    const weeks = Math.floor(diffInWeeks);
    return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
  }

  const diffInMonths = diffInDays / 30.44; // average month length
  if (diffInMonths < 12) {
    const months = Math.floor(diffInMonths);
    return `${months} ${months === 1 ? "month" : "months"} ago`;
  }

  const diffInYears = diffInMonths / 12;
  const years = Math.floor(diffInYears);
  return `${years} ${years === 1 ? "year" : "years"} ago`;
};

export const formatCommentCount = (count) => {
  if (count === 0) return `${count} comment, Leave a comment?`;
  if (count === 1) return `${count} comment`;
  return `${count} comments`;
};

export const formatVotes = (votes) => {
  if (votes === 0) return `${votes} Vote`;
  if (votes === 1) return `+${votes} Vote`;
  if (votes > 1) return `+${votes} Vote`;
  return `${votes} Votes`;
};
