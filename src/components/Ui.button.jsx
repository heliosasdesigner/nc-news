function Button({
  label = "Button",

  styleType = "primary",
  radius = "full", // "full" or "none"
  className = "", // Optional extra classes
  ...props // Pass through other props (e.g. onClick)
}) {
  const baseClasses = "px-6 py-2 font-medium transition-colors duration-200";

  const styleClasses =
    styleType === "primary"
      ? "light:bg-[#C4841D] dark:bg-[#F5A524] text-black hover:opacity-90"
      : "border light:border-[#C4841D] dark:border-[#F5A524] light:text-[#C4841D] dark:text-[#F5A524] bg-transparent hover:bg-[#C4841D] hover:bg-opacity-10 dark:hover:bg-[#F5A524] dark:hover:bg-opacity-10";

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
