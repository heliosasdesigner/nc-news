import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();
  return (
    <button
      className="cursor-pointer flex items-center gap-2 light:fill-black fill-white light:hover:fill-[#C4841D] hover:fill-[#F5A524] transition-all duration-200 ease-in-out"
      onClick={() => navigate(-1)}
      aria-label="Go back"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.97533 4.94165L2.91699 9.99998L7.97533 15.0583"
          stroke="white"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.0836 10H3.05859"
          stroke="white"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Back
    </button>
  );
}

export default BackButton;
