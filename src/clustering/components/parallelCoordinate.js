import React, { useRef, useEffect, useCallback } from "react";
import { ResponsiveParallelCoordinates } from '@nivo/parallel-coordinates'
import { GroupColors } from "./colorByGroup";
import useBlinkLine from "../hooks/parallel";
import { BasicTooltip, Chip, TableTooltip } from "@nivo/tooltip";
// import { CustomTooltip } from './customTooltip';

const CustomTooltip = ({ line }) => {
  const { datum, color } = line;
  const title = "Custom Title";  // 이 부분을 동적으로 설정할 수 있습니다.

  return (
    <div style={{ padding: '5px', background: 'white', borderRadius: '3px', boxShadow: '0 1px 2px rgba(0,0,0,0.25)' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
        <BasicTooltip
          value={line.datum.data.name}
          color={line.datum.color}
          enableChip />
      </div>
      <TableTooltip
        rows={[
          ['수익성', datum.data.수익성],
          ['안정성', datum.data.안정성],
          ['활동성', datum.data.활동성],
          ['생산성', datum.data.생산성],
          ['오공지수', datum.data.오공지수],
        ]}
      />
    </div>
  );
};


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
        { id: '수익성', value: '수익성' },
        { id: '안정성', value: '안정성' },
        { id: '활동성', value: '활동성' },
        { id: '생산성', value: '생산성' },
        { id: '오공지수', value: '오공지수' }
      ]}
      groupBy="group"
      margin={{ top: 10, right: 8, bottom: 30, left: 30 }}
      curve="monotoneX"
      colors={GroupColors}
      colorBy="group"
      lineWidth={1}
      lineOpacity="0.5"
      pixelRatio={1.25}
      layers={['axes', 'lines', 'legends']}
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