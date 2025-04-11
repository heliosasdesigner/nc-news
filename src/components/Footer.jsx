import { FaLinkedin, FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer className="w-screen my-12 dark:text-gray-300 font-light">
      <div className="h-1 bg-[#C4841D] dark:bg-[#F5A524]" />

      <div className=" mx-6 px-4 py-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="mb-2">This is a portfolio website of Helios SL So</p>
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="text-xl hover:text-[#C4841D] dark:hover:text-[#F5A524]" />
            </a>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub className="text-xl hover:text-[#C4841D] dark:hover:text-[#F5A524]" />
            </a>
          </div>
        </div>

        <hr className="border-neutral-700 w-full sm:hidden" />

        <div className="sm:text-right">
          <p>© 2025 Helios SL So</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
