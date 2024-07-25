import { Context, createContext } from "react";
import { TalentWeightContextType } from "./types";

const TalentWeightContext: Context<TalentWeightContextType> =
  createContext<TalentWeightContextType>({
    talentWeight: "exponential",
    setTalentWeight: () => {},
  });

export { TalentWeightContext };
