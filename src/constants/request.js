import {movieApi} from "./axios";

movieApi.interceptors.request.use(config => {

    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
  return Promise.reject(error);
})

movieApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      // logout User;
    }

    if (status === 500) {
      console.error("Server error");
    }

    return Promise.reject(error);
  }
);