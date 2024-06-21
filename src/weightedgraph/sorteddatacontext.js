import React, { createContext, useState } from "react";

export const SortedDataContext = createContext();

export const SortedDataProvider = ({ children }) => {
  const [sortedData2, setSortedData2] = useState([]);

  return (
    <SortedDataContext.Provider value={{ sortedData2, setSortedData2 }}>
      {children}
    </SortedDataContext.Provider>
  );
};
