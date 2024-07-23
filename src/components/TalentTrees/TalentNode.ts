export interface TalentNode {
  id: number;
  name: string;
  description: string;
  totalRanks: number;
  rank: number;
  type: "active" | "passive";
  lockedBy?: number[];
  unlocks: number[];
  row: number;
  column: number;
  spellId: number;
  isClassTalent: boolean;
  partiallySelected?: boolean;
  choiceNode: boolean;
  choiceIndex: number;
  isDefaultNode: boolean;
}
