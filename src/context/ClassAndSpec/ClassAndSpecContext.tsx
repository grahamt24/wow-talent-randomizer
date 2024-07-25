import React from "react";
import { PropsWithChildren, useState } from "react";
import { Class } from "../../api/WorldOfWarcraftClasses/types";
import { Specialization } from "../../api/WorldOfWarcraftSpecializations/types";
import { ClassAndSpecContext } from "./constants";

function ClassAndSpecContextProvider(props: PropsWithChildren) {
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

export { ClassAndSpecContextProvider };
