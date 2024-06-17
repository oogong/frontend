import React, { useState } from "react";
import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import { BasicTooltip } from "@nivo/tooltip";
import { useScatterData, useBlinkNode } from "../hooks/scatter";
import "./styles/style.css";

export default function Scatter() {
  const { scatterData, loading } = useScatterData();
  const { setHoveredNode, RenderingNode } = useBlinkNode();
  const colorList = ["#FAE859", "#506798", "orange", "#86CC80", "pink"];

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div id="scatter-plot-container">
      <ResponsiveScatterPlot
        data={scatterData}
        margin={{ top: 30, right: 10, bottom: 30, left: 10 }}
        xScale={{ type: "linear", min: 0, max: 100 }}
        xFormat=" >-0,.2f"
        yScale={{ type: "linear", min: 0, max: 100 }}
        yFormat=">-.2f"
        colors={(point) => colorList[point.serieId]}
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
        onMouseEnter={(node) => setHoveredNode(node.id)}
        onMouseLeave={() => setHoveredNode(null)}
        // nodeComponent={RenderingNode}
        tooltip={({ node }) => (
          <BasicTooltip value={node.data.name} color={node.color} enableChip />
        )}
      />
    </div>
  );
}
