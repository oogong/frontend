import React, { useContext, useEffect } from 'react'
import { ParallelCoordinate } from './parallelCoordinate'
import { PlotContext } from '../hooks/PlotProvider'

export default function Parallel({ height }) {
  const { parallelData } = useContext(PlotContext);

  useEffect(() => {
    console.log("<< Parallel Data Transformed: ", parallelData);
  }, [parallelData])

  return (
    <div style={{ height: `${height}` }}>
      <ParallelCoordinate data={parallelData} />
    </div>
  )
}
