import { createContext } from "react";
import { TalentTreesContextType } from "./types";

const TalentTreesContext = createContext<TalentTreesContextType | undefined>(
  undefined
);

export { TalentTreesContext };
