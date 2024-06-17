// WeightContext.js
import React, { createContext, useState } from "react";

export const WeightContext = createContext();

export const WeightProvider = ({ children, initialSliderValues }) => {
  const [sliderValues, setSliderValues] = useState(initialSliderValues);
  const [stockList, setStockList] = useState([]);

  return (
    <WeightContext.Provider
      value={{ sliderValues, setSliderValues, stockList, setStockList }}>
      {children}
    </WeightContext.Provider>
  );
};
