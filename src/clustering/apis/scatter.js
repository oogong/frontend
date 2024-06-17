import axios from "axios";
import { API_URL } from "../../main/apis/core";

export const getClusterData = (stockList) => {
  return axios
    .post(`${API_URL.LOCAL}/api/cluster`, { stockList: stockList }) // 추후 데이터 변경
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching cluster data:", error);
    });
};
