// WeightContext.js
import React, { createContext, useState } from "react";

export const WeightContext = createContext();

export const WeightProvider = ({ children }) => {
  console.log({ children });
<<<<<<< HEAD
  const [sliderValues, setSliderValues] = useState([30, 10, 30, 25, 5]);
=======
  const [sliderValues, setSliderValues] = useState([20, 20, 20, 20, 20]);
>>>>>>> 227116f0fc979946135d768b850b7bafcb96f040

  return (
    <WeightContext.Provider value={{ sliderValues, setSliderValues }}>
      {children}
    </WeightContext.Provider>
  );
};
