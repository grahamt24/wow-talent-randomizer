import { Context, createContext } from "react";
import { TalentWeightContextType } from "./types";

const TalentWeightContext: Context<TalentWeightContextType | undefined> =
  createContext<TalentWeightContextType | undefined>(undefined);

export { TalentWeightContext };
