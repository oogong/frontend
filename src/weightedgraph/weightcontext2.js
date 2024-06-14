// WeightContext.js
import React, { createContext, useState } from "react";

export const WeightContext2 = createContext();

export const WeightProviderCompare = ({ children }) => {
  console.log({ children });
  const [sliderValues2, setSliderValues2] = useState([20, 20, 20, 20, 20]);

  return (
    <WeightContext2.Provider value={{ sliderValues2, setSliderValues2 }}>
      {children}
    </WeightContext2.Provider>
  );
};
