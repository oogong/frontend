import React, { useCallback, useState } from 'react'

const useBlinkLine = () => {
  const [hoveredLine, setHoveredLine] = useState(null);

  const handleMouseEnter = useCallback((line) => {
    setHoveredLine(line);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredLine(null);
  }, []);

  return { hoveredLine, handleMouseEnter, handleMouseLeave };
}

export default useBlinkLine;