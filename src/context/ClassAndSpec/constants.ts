import { Context, createContext } from "react";
import { ClassAndSpecContextType } from "./types";

const ClassAndSpecContext: Context<ClassAndSpecContextType> =
  createContext<ClassAndSpecContextType>({
    currentClass: undefined,
    currentSpec: undefined,
    setCurrentClass: () => {},
    setCurrentSpec: () => {},
  });

export { ClassAndSpecContext };
