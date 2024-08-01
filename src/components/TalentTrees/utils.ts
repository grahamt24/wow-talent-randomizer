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

function getNodeColumn(node: TalentNode, middleCol: number, maxColumn: number) {
  if (node.column < middleCol) {
    return Math.ceil(maxColumn / 2) - 1;
  } else if (node.column === middleCol) {
    return Math.ceil(maxColumn / 2);
  } else {
    return Math.ceil(maxColumn / 2) + 1;
  }
}

function getNodeRow(node: TalentNode, middleRow: number, maxRow: number) {
  if (node.row < middleRow) {
    if (middleRow - node.row === 1) {
      return Math.floor(maxRow / 2) - 1;
    } else if (middleRow - node.row === 2) {
      return Math.floor(maxRow / 2) - 2;
    } else {
      throw new Error("Error getting row");
    }
  } else if (node.row === middleRow) {
    return Math.floor(maxRow / 2);
  } else {
    if (node.row - middleRow === 1) {
      return Math.floor(maxRow / 2) + 1;
    } else if (node.row - middleRow === 2) {
      return Math.floor(maxRow / 2) + 2;
    } else {
      throw new Error("Error getting row");
    }
  }
}

function buildGrid(
  maxRow: number,
  maxColumn: number,
  data: [TalentNode[], TalentNode[], TalentNode[]]
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

  // for hero talents, it's always a 3x5 grid but the display column and row can be wildly off
  // so we are normalizing the column index to (maxCol / 2) - 1, (maxCol / 2), and (maxCol / 2) + 1
  // and normalizng the row to the same but with an extra row before and at the end
  let middleCol = -Infinity;
  let middleRow = -Infinity;
  data[2].forEach((node, ind) => {
    // since hero talents are sorted by row then column, the first one in the array will always be the middle column
    // and the first row, so the middle row should be + 2
    if (ind === 0) {
      middleCol = node.column;
      middleRow = node.row + 2;
    }
    const row = getNodeRow(node, middleRow, maxRow);
    const col = getNodeColumn(node, middleCol, maxColumn);
    grid[row - 1][col - 1] = node;
    node.unlocks.forEach((unlockId) => {
      const childNode = data[2].find((n) => n.id === unlockId);
      if (childNode) {
        connections.push({
          from: { ...node, column: col, row },
          to: {
            ...childNode,
            column: getNodeColumn(childNode, middleCol, maxColumn),
            row: getNodeRow(childNode, middleRow, maxRow),
          },
        });
      }
    });
  });

  return { grid, connections };
}

export { getMaxColumnAndRow, buildGrid };
