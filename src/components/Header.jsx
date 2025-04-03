import React from "react";
import CategoryNavbar from "./CategoryNavbar";
import ThemeToggle from "./ThemeToggle";
import UserProfile from "./UserProfile";
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
