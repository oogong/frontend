import axios from 'axios'

export async function getStockRatios(stock_code){
  const resp = axios.get(`/api/stocksDetail/${stock_code}`);

  return (await resp).data;
}

const data = {
	"code": "005930",
	"name": "삼성전자",
  "price": 80000,

  // 오공지수
  "ogong_rate": 44.3,
	
  "profit": [ //수익성
    { 
      "metrix": "자기자본이익률",
      "rate": 13.3
    },
    {
      "metrix": "자산이익률",
      "rate": 33.3
    },
    {
      "metrix": "매출총이익률",
      "rate": 23.3
    }
  ],
  "growth": [ // 성장성
    { 
      "metrix": "grototalInventoryTurnoverPeriod",
      "rate": 13.3
    },
    {
      "metrix": "grototalisNetIncomeYoY",
      "rate": 33.3
    },
    {
      "metrix": "grototalisOperatingProfitLossYoY",
      "rate": 243.3
    },
    {
      "metrix": "grototalisRevenueYoY",
      "rate": 3.3
    }
  ],
  "stability": [ // 안정성
    { 
      "metrix": "saaverageStaDebtRatio",
      "rate": 13.3
    },
    {
      "metrix": "saaverageStaCurrentRatio",
      "rate": 33.3
    }
  ],
  "activity": [ // 활동성
    { 
      "metrix": "effInventoryTurnoverPeriod",
      "rate": 113.3
    },
    {
      "metrix": "effPayablesTurnoverPeriod",
      "rate": 33.3
    },
    {
      "metrix": "effReceivablesTurnoverPeriod",
      "rate": 63.3
    }
  ]
}

// export function getStockRatios(stock_code){
//   return data;
// }