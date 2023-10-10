export interface TalentNode {
  id: number;
  name: string;
  description: string;
  image: string;
  totalRanks: number;
  rank: number;
  type: "active" | "passive";
  lockedBy: number[];
  unlocks: number[];
  row: number;
  column: number;
}
