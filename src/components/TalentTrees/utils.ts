import { Connections, TalentNode } from "../../api/BlizzardAPI/types";
import { GridAndConnections } from "./types";

function getMaxColumnAndRow(data: [TalentNode[], TalentNode[]]) {
  let maxColumn = -Infinity;
  let maxRow = -Infinity;
  data[0].forEach((node) => {
    if (node.column > maxColumn) {
      maxColumn = node.column;
    }
    if (node.row > maxRow) {
      maxRow = node.row;
    }
  });
  data[1].forEach((node) => {
    if (node.column > maxColumn) {
      maxColumn = node.column;
    }
    if (node.row > maxRow) {
      maxRow = node.row;
    }
  });

  return {
    maxRow,
    maxColumn,
  };
}

function buildGrid(
  maxRow: number,
  maxColumn: number,
  data: [TalentNode[], TalentNode[]]
): GridAndConnections {
  const grid = [...Array(maxRow)].map(() => Array(maxColumn).fill(0));
  const connections: Connections[] = [];

  data[0].forEach((node) => {
    grid[node.row - 1][node.column - 1] = node;
    node.unlocks.forEach((unlockId) => {
      const childNode =
        data[0].find((n) => n.id === unlockId) ||
        data[1].find((n) => n.id === unlockId);
      if (childNode) {
        connections.push({ from: node, to: childNode });
      }
    });
  });

  data[1].forEach((node) => {
    grid[node.row - 1][node.column - 1] = node;
    node.unlocks.forEach((unlockId) => {
      const childNode =
        data[0].find((n) => n.id === unlockId) ||
        data[1].find((n) => n.id === unlockId);
      if (childNode) {
        connections.push({ from: node, to: childNode });
      }
    });
  });

  return { grid, connections };
}

export { getMaxColumnAndRow, buildGrid };
