import { Dispatch, SetStateAction } from "react";

interface TalentWeightContextType {
  talentWeight: "flat" | "exponential";
  setTalentWeight: Dispatch<SetStateAction<"flat" | "exponential">>;
}

export type { TalentWeightContextType };
