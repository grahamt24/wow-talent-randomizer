import { ResponseData } from "../../api/BlizzardAPI/types";

interface TalentTrees {
  [talentTreeId: number]: {
    [specId: number]: ResponseData;
  };
}

interface TalentTreesContextType {
  talentTrees: TalentTrees;
  loading: boolean;
}

export type { TalentTrees, TalentTreesContextType };
