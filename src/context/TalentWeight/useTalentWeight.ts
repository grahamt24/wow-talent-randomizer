import { useContext } from "react";
import { TalentWeightContext } from "./constants";

function useTalentWeight() {
  const context = useContext(TalentWeightContext);
  if (!context) {
    throw new Error(
      "useTalentWeight must be used within a TalentWeightProvider"
    );
  }
  return context;
}

export { useTalentWeight };
