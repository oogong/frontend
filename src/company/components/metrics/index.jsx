import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export default function Matrix({ratio, color})  {

  return (
    <ResponsiveContainer width="100%" height={240}>
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
        <XAxis dataKey="matrix" scale="point" padding={{ left: 50, right: 50 }} />
        <YAxis />
        <Tooltip />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey="rates" fill={color} background={{ fill: '#eee' }} />
      </BarChart>
    </ResponsiveContainer>
  )
}
