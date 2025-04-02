import React from "react";
import CategoryNavbar from "./Header/CategoryNavbar";
import ThemeToggle from "./header/ThemeToggle";
import UserProfile from "./Header/UserProfile";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <Link to={`/`}>
        <div>LOGO Here</div>
      </Link>
      <CategoryNavbar />
      <ThemeToggle />
      <button>Log In</button>
      <UserProfile />
    </>
  );
}

export default Header;
