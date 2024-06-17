import { useState, useEffect } from "react";
import { getClusterData } from "../apis/scatter";
import { animated } from "@react-spring/web";

export const useScatterData = () => {
  const [scatterData, setScatterData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getClusterData()
      .then((data) => {
        console.log(JSON.stringify(data));
        setScatterData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cluster data:", error);
        setLoading(false);
      });
  }, []);

  return { scatterData, loading };
};

export const useBlinkNode = () => {
  const [hoveredNode, setHoveredNode] = useState(null);

  const BlinkNode = ({ node, isHovered }) => (
    <g transform={`translate(${node.x}, ${node.y})`}>
      <animated.circle
        cx={0}
        cy={0}
        r={node.size / 2}
        fill={isHovered ? "black" : node.color}
        style={{ mixBlendMode: node.blendMode }}
      />
    </g>
  );

  const RenderingNode = (props) => (
    <BlinkNode {...props} isHovered={hoveredNode === props.node.id} />
  );
  return { setHoveredNode, RenderingNode };
};
