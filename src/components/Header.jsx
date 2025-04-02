import React from "react";
import CategoryNavbar from "./Header/CategoryNavbar";
import ThemeToggle from "./header/ThemeToggle";
import UserProfile from "./Header/UserProfile";

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
