import { useState, useEffect } from "react";
import { getClusterData } from "../apis/scatter";

export const useScatterData = () => {
  const [scatterData, setScatterData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getClusterData()
      .then((data) => {
        console.log(JSON.stringify(data));
        setScatterData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cluster data:", error);
        setLoading(false);
      });
  }, []);

  return { scatterData, loading };
};
