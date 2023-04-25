import { setAccessToken } from "@/auth/authSlice";
import { store } from "@/redux/store";
import { User } from "@/types/User";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000", // Resource API
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    const token = store.getState().auth.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const res = await fetch("/api/token");
      const { accessToken } = (await res.json()) as User;
      store.dispatch(setAccessToken(accessToken));

      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return axiosInstance(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
