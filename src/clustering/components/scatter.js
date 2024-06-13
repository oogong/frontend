import React from "react";
import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import style from "./styles/style.css";
import { useScatterData } from "../hooks/scatter";

export default function Scatter() {
  const { scatterData, loading } = useScatterData();
  const colorList = ["#FFB3BA", "#AEC6CF", "#B3E2CD", "#FFDAB9", "#D7BDE2"];

  if (loading) {
    return <p>Loading...</p>;
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
