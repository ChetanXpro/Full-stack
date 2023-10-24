import { useAtom } from "jotai";
import { isLoggedInAtom, user } from "../atoms/atoms";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useAxiosPrivate from "./useAxiosPrivate";
import jwtDecode from "jwt-decode";

const useAuthentication = () => {
  // const [userData, setUserData] = useAtom(user);
  // const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);

  let isLoggedIn = false;

  isLoggedIn = !!sessionStorage.getItem("access_token");

  if (isLoggedIn) {
  }

  return { isLoggedIn };
};

export default useAuthentication;
