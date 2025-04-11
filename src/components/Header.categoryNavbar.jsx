import { getAllTopics } from "../api";
import { useApiRequest } from "../hooks/useApiRequest";
import Button from "./Ui.button";

function CategoryNavbar() {
  const { data: topics, isLoading } = useApiRequest(getAllTopics);
  return (
    <ul className=" flex items-center justify-between cursor-pointer gap-8">
      <li>
        <Button
          label="All"
          styleType="light"
          radius="none"
          className="w-full  rounded-sm py-2"
        />
      </li>
      {isLoading ? (
        <li>Loading...</li>
      ) : (
        topics?.map((topic) => {
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
