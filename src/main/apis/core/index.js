import axios from "axios";

export const API = axios.create({
  withCredentials: true,
});

export const API_URL = {
  LOCAL: "http://localhost:5000",
};
