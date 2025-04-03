import { getAllTopics } from "../api";
import { useApiRequest } from "../hooks/useApiRequest";

function CategoryNavbar() {
  const { data, isLoading } = useApiRequest(getAllTopics);
  return (
    <ul>
      <li>
        <button>All</button>
      </li>
      {isLoading ? (
        <li>Loading...</li>
      ) : (
        data?.map((topic) => {
          return (
            <li key={topic.slug}>
              <button>{topic.slug}</button>
            </li>
          );
        })
      )}
    </ul>
  );
}

export default CategoryNavbar;
