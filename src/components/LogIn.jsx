import { getAllUsers } from "../api";
import { useApiRequest } from "../hooks/useApiRequest";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "./Header.logo";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import BackButton from "./Ui.backButton";
import Button from "./Ui.button";
import { useContext, useState } from "react";
import { AuthContent } from "./AuthContext";

function LogIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: users, isLoading, error } = useApiRequest(getAllUsers);
  const { loginUser } = useContext(AuthContent);
  const [logInUser, setLogInUser] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [password, setPassword] = useState("demopassword");
  const [confirmPassword, setConfirmPassword] = useState("demopassword");

  const from = location.state?.from?.pathname || "/";

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Oops.....</div>;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (logInUser === "") {
      setErrorMsg("Please select a user");
      return;
    }

    const foundUser = users.find((user) => user.username === logInUser);
    if (foundUser) {
      loginUser(foundUser);
      navigate(from);
    }
  }

  return (
    <div className="h-screen flex flex-col w-5xl gap-2 mx-auto">
      <div className="my-12 flex justify-center">
        <Link to={`/`}>
          <Logo />
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex">
          <BackButton />
        </div>
        <div className="flex justify-center items-start gap-8">
          <div className="hidden sm:block">
            <img
              className="max-w-[600px]"
              src="https://images.unsplash.com/photo-1600873040273-48e6da19ed94?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGRvb3J8ZW58MHx8MHx8fDA%3D"
              alt="Random-Img"
            />
          </div>
          <form className="flex flex-col items-start" onSubmit={handleSubmit}>
            <h3 className="text-3xl mb-6">Log In</h3>
            <p className="mb-12">
              This login page is for demonstration purposes only. You can select
              a user from the username field to post and update votes.
            </p>
            <label
              htmlFor="username"
              className="light:text-[#C4841D] dark:text-[#F5A524] mb-4"
            >
              Username<span className="text-red-600">*</span>
            </label>
            <div
              className={`flex items-center py-2 border-b-2 w-full ${
                errorMsg ? "border-red-500" : ""
              }`}
            >
              <FaUser className="mr-2" />
              <select
                name="username"
                id="username"
                className="flex-1"
                value={logInUser}
                onChange={(e) => {
                  setLogInUser(e.target.value);
                  if (e.target.value !== "") setErrorMsg("");
                }}
              >
                <option value="" disabled>
                  Please select user
                </option>
                {users.map((user) => (
                  <option key={user.username} value={user.username}>
                    {user.username}
                  </option>
                ))}
              </select>
            </div>
            {errorMsg && <span className="text-red-500 mb-4">{errorMsg}</span>}
            <label
              htmlFor="password"
              className="light:text-[#C4841D] dark:text-[#F5A524] mb-4 mt-8"
            >
              Password<span className="text-red-600">*</span>
            </label>
            <div className="flex items-center py-2 border-b-2 mb-6 w-full">
              <FaLock className="mr-2" />
              <input
                className="w-full outline-none"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
              />
              <div
                className="ml-2 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            <label
              htmlFor="confirm-password"
              className="light:text-[#C4841D] dark:text-[#F5A524] mb-4"
            >
              Confirm Password<span className="text-red-600">*</span>
            </label>
            <div className="flex items-center py-2 border-b-2 mb-6 w-full">
              <FaLock className="mr-2" />
              <input
                className="w-full outline-none"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type={showConfirmPassword ? "text" : "password"}
              />
              <div
                className="ml-2 cursor-pointer"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            <div className="w-full mt-6">
              <Button
                onClick={handleSubmit}
                label="Log In"
                styleType="primary"
                radius="none"
                className="w-full shadow-lg shadow-indigo-800 rounded-sm py-4"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
