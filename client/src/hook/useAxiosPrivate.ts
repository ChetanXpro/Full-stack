import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { apiPrivateInstance } from "../Api/api";
import useRefreshToken from "./useRefreshToken";
import { authAtom } from "../atoms/atoms";
import { useAtom } from "jotai";
import { Routes } from "../constants/consts";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = sessionStorage.getItem("access_token");
    const requestIntercept = apiPrivateInstance.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = apiPrivateInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;

        console.log("error", error);

        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return apiPrivateInstance(prevRequest);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      apiPrivateInstance.interceptors.request.eject(requestIntercept);
      apiPrivateInstance.interceptors.response.eject(responseIntercept);
    };
  }, []);

  return apiPrivateInstance;
};

export default useAxiosPrivate;
