import { Connections, TalentNode } from "../../api/BlizzardAPI/types";

interface TalentTreeWrapperProps {
  talentBackground?: string;
}

interface GridAndConnections {
  grid: Array<Array<number | TalentNode>>;
  connections: Connections[];
}

interface MinAndMaxColumnAndRows {
  maxRow: number;
  minRow: number;
  maxColumn: number;
  minColumn: number;
}

export type {
  TalentTreeWrapperProps,
  GridAndConnections,
  MinAndMaxColumnAndRows,
};
