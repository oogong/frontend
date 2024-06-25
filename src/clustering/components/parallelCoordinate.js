import React, { useRef, useEffect, useCallback, useState } from "react";
import { ResponsiveParallelCoordinates } from '@nivo/parallel-coordinates'
import { GroupColors } from "./colorByGroup";
import useBlinkLine from "../hooks/parallel";
import { CustomTooltip } from "./customTooltip";
import CustomLineHighlight from "./customLineHighlight";

export const ParallelCoordinate = ({ data }) => {
  const [highlightedGroup, setHighlightedGroup] = useState(null);

  const handleLegendClick = (groupIndex) => {
    if (highlightedGroup === groupIndex) {
      setHighlightedGroup(null); // 이미 선택된 그룹이면 선택 해제
    } else {
      setHighlightedGroup(groupIndex); // 그룹 선택
    }
  };

  const lineOpacity = (line, groupIndex) => {
    console.log("line opacity >>> ", GroupColors);
    if (highlightedGroup !== null && groupIndex !== highlightedGroup) {
      return 0.5; // 선택된 그룹이 아닌 다른 그룹의 라인은 투명도를 낮춤
    }
    return 1; // 선택된 그룹의 라인은 전체 표시
  };

  return (
    data &&
    <ResponsiveParallelCoordinates
      data={data}
      variables={[
        { id: '수익성', value: '수익성', ticksPosition: 'after', legendPosition: 'start', legendOffset: 30 },
        { id: '안정성', value: '안정성', ticksPosition: 'after', legendPosition: 'start', legendOffset: -10 },
        { id: '활동성', value: '활동성', ticksPosition: 'after', legendPosition: 'start', legendOffset: -10 },
        { id: '생산성', value: '생산성', ticksPosition: 'after', legendPosition: 'start', legendOffset: -10 },
        { id: '오공지수', value: '오공지수', ticksPosition: 'after', legendPosition: 'start', legendOffset: -10 }
      ]}
      groupBy="group"
      margin={{ top: 5, right: 25, bottom: 0, left: 0 }}
      curve="monotoneX"
      colors={GroupColors}
      colorBy="group"
      lineWidth={3}
      lineOpacity={(line, groupIndex) => lineOpacity(line, groupIndex)}
      pixelRatio={1.25}
      layers={['lines', 'axes', 'legends',
        // { // 커스텀 라인 강조 레이어
        //   id: 'custom-line-highlight',
        //   component: (
        //     <CustomLineHighlight
        //       data={data.map((d, index) => ({ line: d, color: GroupColors[d.group] }))}
        //       highlightedLine={highlightedLine}
        //       onLineHover={handleLineHover}
        //     />
        //   ),
        // },
        'mesh', // 격자
        'annotations', // 주석
      ]}
      tooltip={(line) => <CustomTooltip line={line} />}
      legends={[
        {
          anchor: 'top-left', // 위치 설정
          direction: 'column', // 방향 설정
          translateX: 20, // X 축 이동 설정
          translateY: 0, // Y 축 이동 설정
          itemWidth: 80, // 항목 너비 설정
          itemHeight: 20, // 항목 높이 설정
          itemTextColor: '#999', // 항목 텍스트 색상 설정
          symbolSize: 12, // 심볼 크기 설정
          symbolShape: 'circle', // 심볼 모양 설정
          onClick: (legend, event) => handleLegendClick(legend.index), // 클릭 이벤트 핸들러
          effects: [
            {
              on: 'hover', // 호버 이펙트
              style: {
                itemTextColor: '#000', // 호버 시 텍스트 색상 변경
              },
            },
          ],
        },
      ]}
    />
  )
}