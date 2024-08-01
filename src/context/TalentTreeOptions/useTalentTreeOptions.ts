import { useContext } from "react";
import { TalentTreeOptionsContext } from "./constants";

function useTalentTreeOptions() {
  const context = useContext(TalentTreeOptionsContext);
  if (!context) {
    throw new Error(
      "useTalentTreeOptions must be used within a TalentTreeOptionsProvider"
    );
  }
  return context;
}

export { useTalentTreeOptions };
