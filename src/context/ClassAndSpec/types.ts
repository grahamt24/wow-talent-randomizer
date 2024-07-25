import { Dispatch, SetStateAction } from "react";
import { Class } from "../../api/WorldOfWarcraftClasses/types";
import { Specialization } from "../../api/WorldOfWarcraftSpecializations/types";

interface ClassAndSpecContextType {
  currentClass: Class | undefined;
  currentSpec: Specialization | undefined;
  setCurrentClass: Dispatch<SetStateAction<Class | undefined>>;
  setCurrentSpec: Dispatch<SetStateAction<Specialization | undefined>>;
}

export type { ClassAndSpecContextType };
