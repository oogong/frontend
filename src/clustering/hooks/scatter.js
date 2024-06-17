import { useState, useEffect, useContext } from "react";
import { getClusterData } from "../apis/scatter";
import { animated } from "@react-spring/web";
import { WeightContext } from "../../weightedgraph/weightcontext";

export const useScatterData = () => {
  const [scatterData, setScatterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { stockList } = useContext(WeightContext);

  useEffect(() => {
    if (stockList.length > 0) {
      getClusterData(stockList)
        .then((data) => {
          console.log("Data", data);
          setScatterData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching cluster data:", error);
          setLoading(false);
        });
    }
  }, [stockList]);

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
