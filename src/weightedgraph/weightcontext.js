// WeightContext.js
import React, { createContext, useState } from "react";

export const WeightContext = createContext();

export const WeightProvider = ({ children }) => {
  console.log({ children });
  const [sliderValues, setSliderValues] = useState([20, 20, 20, 20, 20]);
  const [stockList, setStockList] = useState([]);

  return (
    <WeightContext.Provider
      value={{ sliderValues, setSliderValues, stockList, setStockList }}
    >
      {children}
    </WeightContext.Provider>
  );
};
