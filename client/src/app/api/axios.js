import axios from "axios";

// development -> "http://localhost:3000 or port number in .env file in backend"
const BASE_URL = "https://inventotrack-api-8t6b.onrender.com";

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
