import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuthentication from "../../hook/useAuthentication";
import { Routes } from "../../constants/consts";

const RequireAuth = () => {
  const { isLoggedIn } = useAuthentication();

  console.log("Is logged in", isLoggedIn);

  return (
    <>
      {isLoggedIn ? (
        <Outlet />
      ) : (
        <Navigate
          to={Routes.LOGIN}
          replace
          state={{ path: location.pathname }}
        />
      )}
    </>
  );
};

export default RequireAuth;
