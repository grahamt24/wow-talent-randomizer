import React, {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Class } from "../../api/Classes/Class";
import { Specialization } from "../../api/Specializations/Specialization";

interface ClassAndSpecContext {
  currentClass: Class | undefined;
  currentSpec: Specialization | undefined;
  classLevel: number;
  setCurrentClass: Dispatch<SetStateAction<Class | undefined>>;
  setCurrentSpec: Dispatch<SetStateAction<Specialization | undefined>>;
  setClassLevel: Dispatch<SetStateAction<number>>;
}

const ClassAndSpecContext: React.Context<ClassAndSpecContext> =
  React.createContext<ClassAndSpecContext>({
    currentClass: undefined,
    currentSpec: undefined,
    classLevel: 0,
    setCurrentClass: () => {},
    setCurrentSpec: () => {},
    setClassLevel: () => {}
  });

export function ClassAndSpecContextProvider(props: PropsWithChildren) {
  const [currentClass, setCurrentClass] = useState<Class | undefined>();
  const [currentSpec, setCurrentSpec] = useState<Specialization | undefined>();
  const [classLevel, setClassLevel] = useState<number>(60);
  return (
    <ClassAndSpecContext.Provider
      value={{
        currentClass,
        currentSpec,
        classLevel,
        setCurrentClass,
        setCurrentSpec,
        setClassLevel,
      }}
    >
      {props.children}
    </ClassAndSpecContext.Provider>
  );
}

export function useClassAndSpec() {
  return useContext(ClassAndSpecContext);
}
