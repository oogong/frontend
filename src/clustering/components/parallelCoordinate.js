import React, { useRef, useEffect, useCallback, useState } from "react";
import { ResponsiveParallelCoordinates } from '@nivo/parallel-coordinates'
import { GroupColors } from "./colorByGroup";
import useBlinkLine from "../hooks/parallel";
import { CustomTooltip } from "./customTooltip";
import CustomLineHighlight from "./customLineHighlight";

export const ParallelCoordinate = ({ data }) => {

  return (
    data &&
    <ResponsiveParallelCoordinates
      isInteractive
      data={data}
      variables={[
        { id: '수익성', value: '수익성', ticksPosition: 'after', legendPosition: 'start', legendOffset: 30, min: 0, max: 100, },
        { id: '안정성', value: '안정성', ticksPosition: 'after', legendPosition: 'start', legendOffset: -10, min: 0, max: 100 },
        { id: '활동성', value: '활동성', ticksPosition: 'after', legendPosition: 'start', legendOffset: -10, min: 0, max: 100 },
        { id: '생산성', value: '생산성', ticksPosition: 'after', legendPosition: 'start', legendOffset: -10, min: 0, max: 100 },
        { id: '오공지수', value: '오공지수', ticksPosition: 'after', legendPosition: 'start', legendOffset: -10, min: 0, max: 100 }
      ]}
      groupBy="group"
      margin={{ top: 5, right: 25, bottom: 23, left: 0 }}
      // curve="monotoneX"
      curve="linear"
      colors={GroupColors}
      colorBy="group"
      lineWidth={3}
      lineOpacity={0.5}
      // lineOpacity={(line, groupIndex) => lineOpacity(line, groupIndex)}
      pixelRatio={1.25}
      layers={[
        // 'lines',
        'axes',
        'legends',
        CustomLineHighlight,
        'mesh', // 격자
        'annotations', // 주석
      ]}
      tooltip={(line) => <CustomTooltip line={line} />}
      legends={[
        {
          anchor: 'bottom',
          direction: 'row',
          justify: false,
          translateX: 29,
          translateY: 36,
          itemsSpacing: 2,
          itemWidth: 68,
          itemHeight: 40,
          itemDirection: 'left-to-right',
          itemOpacity: 0.85,
          symbolSize: 13,
          effects: [
            {
              on: 'hover',
              style: {
                itemOpacity: 1,
                itemTextColor: '#000', // 호버 시 텍스트 색상 변경
              }
            }
          ],
          itemTextColor: '#999', // 항목 텍스트 색상 설정
          symbolShape: 'circle', // 심볼 모양 설정
          // onClick: (legend, event) => handleLegendClick(legend.index), // 클릭 이벤트 핸들러

        },
      ]}


    />

  )
}

const CustomLegend = ({ legends, onMouseEnter, onMouseLeave }) => (
  <div style={{ display: 'flex', justifyContent: 'center', marginTop: 36 }}>
    {legends.map((legend, index) => (
      <div
        key={index}
        style={{ display: 'flex', alignItems: 'center', margin: '0 10px' }}
        onMouseEnter={() => onMouseEnter(legend)}
        onMouseLeave={onMouseLeave}
      >
        <div
          style={{
            width: 13,
            height: 13,
            backgroundColor: legend.color,
            borderRadius: '50%',
            marginRight: 5,
          }}
        ></div>
        <span style={{ color: '#999', opacity: 0.85 }}>{legend.label}</span>
      </div>
    ))}
  </div>
);