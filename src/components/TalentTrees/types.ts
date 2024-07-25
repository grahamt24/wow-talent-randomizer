import { Connections, TalentNode } from "../../api/BlizzardAPI/types";

interface TalentTreeWrapperProps {
  talentBackground?: string;
}

interface GridAndConnections {
  grid: Array<Array<number | TalentNode>>;
  connections: Connections[];
}

export type { TalentTreeWrapperProps, GridAndConnections };
