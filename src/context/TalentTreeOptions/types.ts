import { Dispatch, SetStateAction } from "react";

interface TalentTreeOptionsContextType {
  talentWeight: "flat" | "exponential";
  setTalentWeight: Dispatch<SetStateAction<"flat" | "exponential">>;
  includeHeroTalents: boolean;
  setIncludeHeroTalents: Dispatch<SetStateAction<boolean>>;
}

export type { TalentTreeOptionsContextType };
