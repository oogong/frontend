import React from "react";

const CustomLineHighlight = ({ data, highlightedLine, onLineHover }) => {
  return (
    <g>
      {data.map((d, index) => (
        <path
          key={index}
          d={d.line.path}
          fill="none"
          strokeWidth={2}
          strokeOpacity={highlightedLine === index ? 1 : 0.1}
          stroke={d.color}
          onMouseEnter={() => onLineHover(index)}
          onMouseMove={() => onLineHover(index)}
          onMouseLeave={() => onLineHover(null)}
        />
      ))}
    </g>
  );
};

export default CustomLineHighlight;