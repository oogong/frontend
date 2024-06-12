import React, { useState, useEffect } from "react";
import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import style from "./styles/style.css";
import { getClusterData } from "../apis/scatterApi";

export default function Scatter() {
  const [scatterData, setScatterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const colorList = ["red", "blue", "green", "yellow", "purple"];
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

  if (loading) {
    return <p>Loading...</p>; // 데이터 로딩 중일 때 표시할 내용
  }

  return (
    <div id="scatter-plot-container">
      <h1>Scatter Plot</h1>
      <ResponsiveScatterPlot
        data={scatterData}
        margin={{ top: 60, right: 140, bottom: 70, left: 90 }}
        xScale={{ type: "linear", min: 0, max: 100 }}
        xFormat=" >-0,.2f"
        yScale={{ type: "linear", min: 0, max: 100 }}
        yFormat=">-.2f"
        // colors={{ scheme: "nivo" }}
        colors={(point) => {
          console.log(point);
          return colorList[point.serieId];
        }}
        blendMode="multiply"
        enableGridX={false}
        enableGridY={false}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "",
          legendPosition: "middle",
          legendOffset: 46,
          truncateTickAt: 0,
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "",
          legendPosition: "middle",
          legendOffset: -60,
          truncateTickAt: 0,
        }}
        motionConfig={{
          mass: 1,
          tension: 170,
          friction: 26,
          clamp: true,
          precision: 0.01,
          velocity: 0,
        }}
        legends={[]}
      />
    </div>
  );
}
