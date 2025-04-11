import React from "react";

const Line = ({ x1, y1, x2, y2, stroke = "gray", strokeWidth = 5 }) => {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth={strokeWidth} />;
};

export default Line;
