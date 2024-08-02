import { TalentNode } from "../api/BlizzardAPI/types";

const MOCK_TALENT_NODE: TalentNode = {
  id: 1,
  name: "Mock Talent",
  description: "Mock talent description",
  totalRanks: 1,
  rank: 1,
  type: "active",
  lockedBy: [],
  unlocks: [],
  row: 1,
  column: 1,
  spellId: 1,
  isClassTalent: false,
  partiallySelected: false,
  choiceIndex: 1,
  choiceNode: false,
  isDefaultNode: false,
  isHeroNode: false,
  heroClassName: "",
};

export { MOCK_TALENT_NODE };
