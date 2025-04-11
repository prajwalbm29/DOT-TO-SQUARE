import React from "react";

const Dot = ({ x, y, radius = 10, fill = "gray" }) => {
  return <circle cx={x} cy={y} r={radius} fill={fill} />;
};

export default Dot;
