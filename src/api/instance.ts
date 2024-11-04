import axios from "axios";
import { AUTH_TOKEN } from "../constants";

const createInstance = () => {
  const header = localStorage.getItem(AUTH_TOKEN);

  const instance = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
      Authorization: header,
    },
  });

  return instance;
};

export const instance = createInstance();
