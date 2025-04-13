import { useContext } from "react";
import CategoryNavbar from "./Header.categoryNavbar";
import Logo from "./Header.logo";
import ThemeToggle from "./Header.themeToggle";
import UserProfile from "./Header.userProfile";
import { Link } from "react-router-dom";
import { AuthContent } from "./AuthContext";
import Button from "./Ui.button";

function Header({ topic, setTopic }) {
  const { user } = useContext(AuthContent);

  return (
    <div className="w-full flex items-center justify-between px-12 py-6 mb-5">
      <Link to={`/`} className="shrink-0">
        <Logo />
      </Link>
      <nav className="flex gap-6 mx-auto ">
        <CategoryNavbar currentTopic={topic} setTopic={setTopic} />
      </nav>
      <div className=" flex flex-row ">
        <ThemeToggle />
        {!user ? (
          <Link to={"/login"}>
            <Button
              label="Log In"
              styleType="light"
              radius="none"
              className="w-full rounded-sm  py-2 text-sm border-0 underline"
            />
          </Link>
        ) : (
          <UserProfile />
        )}
      </div>
    </div>
  );
}

export default Header;
