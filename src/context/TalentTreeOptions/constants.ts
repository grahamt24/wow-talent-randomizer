import { Context, createContext } from "react";
import { TalentTreeOptionsContextType } from "./types";

const TalentTreeOptionsContext: Context<TalentTreeOptionsContextType | undefined> =
  createContext<TalentTreeOptionsContextType | undefined>(undefined);

export { TalentTreeOptionsContext };
