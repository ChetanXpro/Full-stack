import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const apiPrivateInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-type": "application/json",
  },
});

export const login = async (payload: any) => {
  try {
    const request = await apiInstance.post("/user/auth", payload, {
      withCredentials: true,
    });
    return request?.data;
  } catch (err: any) {
    const error = err;
    return Promise.reject(error.response);
  }
};

export const signup = async (payload: any) => {
  try {
    const request = await apiInstance.post("/user", payload);

    return request?.data;
  } catch (err: any) {
    return Promise.reject(err.response);
  }
};

export const getUser = async () => {
  try {
    const request = await apiPrivateInstance.get("/user/getUser");
    return request?.data;
  } catch (err: any) {
    return Promise.reject(err.response);
  }
};
