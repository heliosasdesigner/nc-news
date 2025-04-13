function Button({
  label = "Button",

  styleType = "primary",
  radius = "full", // "full" or "none"
  className = "",
  ...props
}) {
  const baseClasses = "font-medium transition-colors duration-200";

  let styleClasses = "";

  if (styleType === "primary") {
    styleClasses =
      "px-6 py-2  light:bg-[#C4841D] dark:bg-[#F5A524] text-black hover:opacity-90";
  } else if (styleType === "light") {
    styleClasses =
      "px-6 py-2  border light:border-[#C4841D] dark:border-[#F5A524] light:text-[#C4841D] dark:text-[#F5A524] bg-transparent hover:bg-[#C4841D] hover:bg-opacity-10 dark:hover:bg-[#F5A524] dark:hover:text-white dark:hover:bg-opacity-10";
  } else if (styleType === "underline") {
    styleClasses = "border-b border-white text-white  hover:opacity-80";
  }

  const radiusClasses = radius === "full" ? "rounded-full" : "rounded-none";

  const handleClick = (e) => {
    if (props.onClick) {
      props.onClick(e);
    }
  };

  return (
    <button
      className={`${baseClasses} ${styleClasses} ${radiusClasses} ${className} `}
      onClick={handleClick}
      {...props}
    >
      {label}
    </button>
  );
}

export default Button;
