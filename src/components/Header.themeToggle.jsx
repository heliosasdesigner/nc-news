import React, { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

function ThemeToggle() {
  const [isLightMode, setIsLightMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "light";
    }
    return window.matchMedia("(prefers-color-scheme: light)").matches;
  });

  useEffect(() => {
    const html = document.documentElement;
    if (isLightMode) {
      html.classList.add("light");
      localStorage.setItem("theme", "light");
    } else {
      html.classList.remove("light");
      localStorage.setItem("theme", "dark");
    }
  }, [isLightMode]);

  const toggleTheme = () => setIsLightMode(!isLightMode);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full transition duration-300 light:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 text-xl"
    >
      {isLightMode ? <FiMoon /> : <FiSun />}
    </button>
  );
}

export default ThemeToggle;
