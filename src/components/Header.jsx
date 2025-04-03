import CategoryNavbar from "./Header.categoryNavbar";
import ThemeToggle from "./Header.themeToggle";
import UserProfile from "./Header.userProfile";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <Link to={`/`}>
        <div>LOGO Here</div>
      </Link>
      <CategoryNavbar />
      <ThemeToggle />
      <Link to={"/login"}>
        <button>Log In</button>
      </Link>
      <UserProfile />
    </>
  );
}

export default Header;
