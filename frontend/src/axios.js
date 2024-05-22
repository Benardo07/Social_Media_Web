import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "https://social-media-web-api.vercel.app/api/",
  withCredentials: true,
});
