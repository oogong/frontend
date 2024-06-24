import React, { useRef, useEffect, useCallback } from "react";
import { ResponsiveParallelCoordinates } from '@nivo/parallel-coordinates'
import { GroupColors } from "./colorByGroup";
import useBlinkLine from "../hooks/parallel";
import { CustomTooltip } from "./customTooltip";

export const ParallelCoordinate = ({ data }) => {
  const { hoveredLine, handleMouseEnter, handleMouseLeave } = useBlinkLine();

  const getColor = useCallback((d) => {
    const groupIndex = data.findIndex(item => item.group === d.id);
    const color = GroupColors[groupIndex % GroupColors.length];
    return hoveredLine && hoveredLine.id === d.id ? color : 'rgba(0, 0, 0, 0.1)';
  }, [hoveredLine]);

  const lineWidth = useCallback((d) => (
    hoveredLine && hoveredLine.id == d.id ? 3 : 1
  ), [hoveredLine]);

  return (
    <ResponsiveParallelCoordinates
      data={data}
      variables={[
        {
          id: '수익성', value: '수익성',
          ticksPosition: 'before',
          legendPosition: 'start',
          legendOffset: 30
        },
        { id: '안정성', value: '안정성' },
        { id: '활동성', value: '활동성' },
        { id: '생산성', value: '생산성' },
        { id: '오공지수', value: '오공지수' }
      ]}
      groupBy="group"
      margin={{ top: 10, right: 8, bottom: 35, left: 30 }}
      curve="monotoneX"
      colors={GroupColors}
      colorBy="group"
      lineWidth={2}
      lineOpacity="0.5"
      pixelRatio={1.25}
      layers={['lines', 'axes', 'legends']}
      legends={[
        {
          anchor: 'bottom',
          direction: 'row',
          justify: false,
          translateX: 157,
          translateY: 38,
          itemsSpacing: 0,
          itemWidth: 43,
          itemHeight: 20,
          itemDirection: 'left-to-right',
          itemOpacity: 0.85,
          symbolSize: 14,
          effects: [
            {
              on: 'hover',
              style: {
                itemOpacity: 1
              }
            }
          ]
        }
      ]}
      tooltip={(line) => <CustomTooltip line={line} />}
      onMouseEnter={(line) => {
        handleMouseEnter(line);
      }}
      onMouseLeave={() => handleMouseLeave}
    />
  )
}