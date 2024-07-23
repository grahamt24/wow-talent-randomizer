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
  setCurrentClass: Dispatch<SetStateAction<Class | undefined>>;
  setCurrentSpec: Dispatch<SetStateAction<Specialization | undefined>>;
}

const ClassAndSpecContext: React.Context<ClassAndSpecContext> =
  React.createContext<ClassAndSpecContext>({
    currentClass: undefined,
    currentSpec: undefined,
    setCurrentClass: () => {},
    setCurrentSpec: () => {},
  });

export function ClassAndSpecContextProvider(props: PropsWithChildren) {
  const [currentClass, setCurrentClass] = useState<Class | undefined>();
  const [currentSpec, setCurrentSpec] = useState<Specialization | undefined>();
  return (
    <ClassAndSpecContext.Provider
      value={{
        currentClass,
        currentSpec,
        setCurrentClass,
        setCurrentSpec,
      }}
    >
      {props.children}
    </ClassAndSpecContext.Provider>
  );
}

export function useClassAndSpec() {
  return useContext(ClassAndSpecContext);
}
