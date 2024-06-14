import axios from 'axios'

import { API_URL } from '../../main/apis/core'

export async function getStockRatios(stock_code){
  const resp = axios.get(`${API_URL.LOCAL}/api/stocksDetail/${stock_code}`);
  return (await resp).data;
}