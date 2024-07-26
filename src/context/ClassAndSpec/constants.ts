import { Context, createContext } from "react";
import { ClassAndSpecContextType } from "./types";

const ClassAndSpecContext: Context<ClassAndSpecContextType | undefined> =
  createContext<ClassAndSpecContextType | undefined>(undefined);

export { ClassAndSpecContext };
