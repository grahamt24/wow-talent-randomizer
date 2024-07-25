import { useContext } from "react";
import { TalentTreesContext } from "./constants";

const useTalentTrees = () => {
  const context = useContext(TalentTreesContext);
  if (!context) {
    throw new Error("useTalentTrees must be used within a TalentTreesProvider");
  }
  return context;
};

export { useTalentTrees };
