import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Matrix({ ratio, color }) {
  return (
    <ResponsiveContainer width="100%" height={270}>
      <BarChart
        data={ratio}
        margin={{
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        }}
        barSize={40}
      >
        <XAxis
          dataKey="matrix"
          scale="point"
          padding={{ left: 50, right: 50 }}
        />
        <YAxis />
        <Tooltip />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey="rates" fill={color} background={{ fill: "#eee" }} />
      </BarChart>
    </ResponsiveContainer>
  );
}
