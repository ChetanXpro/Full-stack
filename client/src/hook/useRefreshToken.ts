import { useAtom } from "jotai";
import { apiInstance, apiPrivateInstance } from "../Api/authApi";
import { authAtom } from "../atoms/atoms";
import { useNavigate } from "react-router-dom";
import { Routes } from "../constants/consts";

const useRefreshToken = () => {
  const [auth, setAuth] = useAtom(authAtom);
  const navigate = useNavigate();

  const refresh = async () => {
    try {
      const response = await apiInstance.get("/user/refresh", {
        withCredentials: true,
      });

      console.log("response", response);

      sessionStorage.setItem("access_token", response.data.accessToken);
      return response.data.accessToken;
    } catch (error) {
      sessionStorage.removeItem("access_token");

      navigate(Routes.LOGIN);
    }
  };

  return refresh;
};

export default useRefreshToken;
