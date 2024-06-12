import axios from "axios";
import { API_URL } from "../../../main/apis/core";

export const getSearchResult = (name) => {
  return axios
    .get(`${API_URL.LOCAL}/api/stocks/search/${name}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error searching stock data:", error);
    });
};
