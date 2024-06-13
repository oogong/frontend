import React, { useEffect, PureComponent } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export default function Metrics({ratio, color})  {

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart
        data={ratio}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        barSize={40}
      >
        <XAxis dataKey="metrix" scale="point" padding={{ left: 50, right: 50 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey="rate" fill={color} background={{ fill: '#eee' }} />
      </BarChart>
    </ResponsiveContainer>
  )
}
