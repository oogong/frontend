import React, { useRef, useEffect } from "react";
import { ResponsiveParallelCoordinatesCanvas } from '@nivo/parallel-coordinates'
import { GroupColors } from "./colorByGroup";
import { axisBottom } from "d3";


export const ParallelCoordinate = ({ data }) => {
  return (
    <ResponsiveParallelCoordinatesCanvas
      data={data}
      variables={[
        { id: '수익성', value: '수익성' },
        { id: '안정성', value: '안정성' },
        { id: '활동성', value: '활동성' },
        { id: '생산성', value: '생산성' },
        { id: '오공지수', value: '오공지수' }
      ]}
      groupBy="group"
      margin={{ top: 10, right: 28, bottom: 30, left: 5 }}
      curve="monotoneX"
      colors={GroupColors}
      colorBy="group"
      lineWidth="2"
      lineOpacity="0.5"
      pixelRatio={1.25}
    />
  )
}