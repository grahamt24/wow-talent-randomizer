import { Connections, TalentNode } from "../../api/BlizzardAPI/types";
import { GridAndConnections, MinAndMaxColumnAndRows } from "./types";

function getMaxAndMinColumnAndRow(data: TalentNode[]): MinAndMaxColumnAndRows {
  let maxColumn = -Infinity;
  let maxRow = -Infinity;
  let minColumn = Infinity;
  let minRow = Infinity;
  data.forEach((node) => {
    if (node.column > maxColumn) {
      maxColumn = node.column;
    }
    if (node.column < minColumn) {
      minColumn = node.column;
    }
    if (node.row > maxRow) {
      maxRow = node.row;
    }
    if (node.row < minRow) {
      minRow = node.row;
    }
  });

  return {
    maxRow,
    maxColumn,
    minRow,
    minColumn,
  };
}

function buildGrid(
  gridDimensions: MinAndMaxColumnAndRows,
  data: TalentNode[]
): GridAndConnections {
  const { maxRow, minRow, maxColumn, minColumn } = gridDimensions;
  const grid = [...Array(maxRow - minRow + 1)].map(() =>
    Array(maxColumn - minColumn + 1).fill(0)
  );
  const connections: Connections[] = [];

  data.forEach((node) => {
    grid[node.row - minRow][node.column - minColumn] = node;
    node.unlocks.forEach((unlockId) => {
      const childNode = data.find((n) => n.id === unlockId);
      if (childNode) {
        connections.push({
          from: node,
          to: childNode,
        });
      }
    });
  });

  return { grid, connections };
}

function getHeroTreeIcon(className: string, heroTreeName: string) {
  return new URL(
    `../../assets/${className}/${heroTreeName}.jpg`,
    import.meta.url
  ).href;
}

export { getMaxAndMinColumnAndRow, buildGrid, getHeroTreeIcon };
