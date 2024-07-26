import { ResponseData } from "../../api/BlizzardAPI/types";

interface TalentTrees {
  [talentTreeId: number]: {
    [specId: number]: ResponseData;
  };
}

interface TalentTreesContextType {
  talentTrees: TalentTrees;
}

export type { TalentTrees, TalentTreesContextType };
