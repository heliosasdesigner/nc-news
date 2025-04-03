import React from "react";
import { useApiRequest } from "../hooks/useApiRequest";
import { getAllUsers } from "../api";

function LogIn() {
  const { data: allUsers, isLoading, error } = useApiRequest(getAllUsers);

  console.log(allUsers);
  return (
    <>
      <div>Logo here</div>
      <div>
        <div></div>
      </div>
    </>
  );
}

export default LogIn;
