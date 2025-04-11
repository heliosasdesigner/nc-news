import { useContext } from "react";
import { AuthContent } from "./AuthContext";
import { Link } from "react-router-dom";
import Button from "./Ui.button";

function UserProfile() {
  const { user } = useContext(AuthContent);
  return (
    <div className="flex flex-row gap-3 my-auto ml-8">
      <img className="size-8 rounded-full" src={user.avatar_url} alt="" />

      <div className="gap-1">
        <div className="my-0 text-xs ">Hi, {user?.name}</div>
        <div className="underline text-xs justify-self-center font-light text-gray-500">
          <Link to={"/login"}>change User ?</Link>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
