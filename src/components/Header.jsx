import React from "react";
import CategoryNavbar from "./CategoryNavbar";
import ThemeToggle from "./ThemeToggle";
import UserProfile from "./UserProfile";

function Header() {
  return (
    <>
      <div>LOGO Here</div>
      <CategoryNavbar />
      <ThemeToggle />
      <button>Log In</button>
      <UserProfile />
    </>
  );
}

export default Header;
