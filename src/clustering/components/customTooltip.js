import React from 'react';
import { ResponsiveParallelCoordinatesCanvas } from '@nivo/parallel-coordinates';
import { BasicTooltip, Chip, TableTooltip } from '@nivo/tooltip';
import { GroupColors } from "./colorByGroup";

export const CustomTooltip = ({ line }) => {
  const { datum, color } = line;
  const title = "Custom Title";  // 이 부분을 동적으로 설정할 수 있습니다.

  return (
    <div style={{ padding: '5px', background: 'white', borderRadius: '3px', boxShadow: '0 1px 2px rgba(0,0,0,0.25)' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
        <Chip color={color} style={{ marginRight: '5px' }} />
        <strong>{title} {datum.data.name}</strong>
      </div>
      <TableTooltip
        rows={[
          ['Profit', datum.data.profit],
          ['Efficiency', datum.data.efficiency],
        ]}
      />
    </div>
  );
};

module.exports = { CustomTooltip };