import React, { useContext, useEffect } from "react";
import { ParallelCoordinate } from "./parallelCoordinate";
import { PlotContext } from "../hooks/PlotProvider";
import { useState } from "react";
// import { Button } from "@material-tailwind/react";

export default function Parallel({ height }) {
  const { parallelData } = useContext(PlotContext);
  const [showParallel, setShowParallel] = useState(true);

  useEffect(() => {
    console.log("<< Parallel Data Transformed: ", parallelData);
  }, [parallelData]);

  const handleButtonClick = () => {
    setShowParallel(false);
  };

  return (
    <div style={{ height: `${height}` }}>
      {/* <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={handleButtonClick}
      >
        Read More{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
          />
        </svg>
      </Button> */}
      {showParallel && <ParallelCoordinate data={parallelData} />}
    </div>
  );
}
