import React from "react";
import { ArrowProps } from "./types";

function Arrow({ from, to, gridCellHeight, gridCellWidth }: ArrowProps) {
  const fromX = (from.column - 1) * gridCellWidth + gridCellWidth / 2;
  const fromY = (from.row - 1) * gridCellHeight + gridCellHeight / 2;
  const toX = (to.column - 1) * gridCellWidth + gridCellWidth / 2;
  const toY = (to.row - 1) * gridCellHeight + gridCellHeight / 2;

  const strokeColor = to.rank > 0 && from.rank > 0 ? "yellow" : "white";

  return (
    <svg
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
        overflow: "visible",
      }}
    >
      <line
        x1={fromX}
        y1={fromY}
        x2={toX}
        y2={toY}
        stroke={strokeColor}
        strokeWidth="2"
      />
    </svg>
  );
}

export { Arrow };
