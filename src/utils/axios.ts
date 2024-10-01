import axios from "axios";

import { STORAGE_KEY } from "../constants/constant";
import { TASK_HOST_API } from "../config-global";
import { isValidToken } from "./jwt-utils";
import { notification } from "antd";
import { toast } from "react-toastify";
// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: TASK_HOST_API });

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem(STORAGE_KEY);
    if (accessToken && isValidToken(accessToken)) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    // Do something with request error here
    notification.error({
      message: "Error",
    });
    Promise.reject(error);
  }
);
// API respone interceptor
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const notificationParam = {
      message: error.response?.data?.message,
    };
    // Remove token and redirect
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem(STORAGE_KEY);
      // store.dispatch(clearUser());
    }

    if (error.response?.status === 508) {
      notificationParam.message = error.response?.data?.message;
    }

    if (error.response?.status === 500) {
      notificationParam.message = error.response?.data?.message;
    }

    toast.error(notificationParam.message, {
      toastId: error.response?.status,
    });
    return Promise.reject(error);
  }
);

export default axiosInstance;
