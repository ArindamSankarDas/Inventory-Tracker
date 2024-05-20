import axios from "axios";

const BASE_URL =
  import.meta.env.MODE === "production" ? undefined : "http://localhost:3500";

export const axiosPrivate = (accessToken) => {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const axiosAuth = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
