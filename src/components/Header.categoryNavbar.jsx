import { useNavigate } from "react-router-dom";
import { getAllTopics } from "../api";
import { useApiRequest } from "../hooks/useApiRequest";
import Button from "./Ui.button";

function CategoryNavbar({ currentTopic, setTopic }) {
  const navigate = useNavigate();
  const { data, isLoading } = useApiRequest(getAllTopics);
  const topics = data ?? [];
  const allTopics = [{ slug: "All" }, ...topics];

  const handleTopic = (updateTopic) => {
    setTopic(updateTopic);
    if (updateTopic === "All") {
      navigate("/");
    } else {
      navigate(`/${updateTopic}`);
    }
  };
  return (
    <ul className="flex items-center gap-8 w-[80%]">
      {isLoading ? (
        <li>Loading...</li>
      ) : (
        allTopics.map((topic) => (
          <li key={topic.slug}>
            <Button
              onClick={() => handleTopic(topic.slug)}
              label={topic.slug}
              styleType={currentTopic === topic.slug ? "light" : "underline"}
              radius="none"
              className=" cursor-pointer  py-2 mx-0"
            />
          </li>
        ))
      )}
    </ul>
  );
}

export default CategoryNavbar;
