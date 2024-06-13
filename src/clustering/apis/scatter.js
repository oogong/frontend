import axios from "axios";
import { API_URL } from "../../main/apis/core";
import dummyRequest from "../datas/dummyRequest.json";

export const getClusterData = () => {
  return axios
    .post(`${API_URL.LOCAL}/api/cluster`, dummyRequest) // 추후 데이터 변경
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching cluster data:", error);
    });
};
