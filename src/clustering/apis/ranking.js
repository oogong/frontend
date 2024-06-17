import axios from "axios";
import { API_URL } from "../../main/apis/core";

export const getRankingDate = () => {
  return axios
    .get(
      `http://ec2-3-35-199-226.ap-northeast-2.compute.amazonaws.com/api/corporates/list`
    )
    .then((response) => {
      console.log("응답", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching ranking data:", error);
    });
};
