import axios from "axios";
import { AUTH_TOKEN } from "../constants";

const createInstance = () => {
  const instance = axios.create({
    baseURL: "http://localhost:8080",
  });

  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem(AUTH_TOKEN);

    if (token) {
      config.headers.Authorization = token;
    }

    return config;
  });

  return instance;
};

export const instance = createInstance();
