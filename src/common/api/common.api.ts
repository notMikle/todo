import axios from "axios";

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {
    "API-KEY": "71deeb43-58b3-400d-8243-05cfac7b0fb7",
  },
});
