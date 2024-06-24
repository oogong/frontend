import axios from "axios";
import { API_URL } from "../../main/apis/core";

export const getClusterData = (stockList, sliderValues) => {
  return axios
    .post(`${API_URL.LOCAL}/api/cluster`, { stockList: stockList, sliderValues: sliderValues }) // 추후 데이터 변경
    .then((response) => {
      console.log("Get Clustered Data from Server : ", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching cluster data:", error);
    });
};
