import React from "react";
import { PropsWithChildren, useState } from "react";
import { TalentWeightContext } from "./constants";

function TalentWeightContextProvider(props: PropsWithChildren) {
  const [talentWeight, setTalentWeight] = useState<"flat" | "exponential">(
    "exponential"
  );
  return (
    <TalentWeightContext.Provider
      value={{
        talentWeight,
        setTalentWeight,
      }}
    >
      {props.children}
    </TalentWeightContext.Provider>
  );
}

export { TalentWeightContextProvider };
