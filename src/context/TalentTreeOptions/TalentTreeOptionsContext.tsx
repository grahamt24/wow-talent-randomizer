import React from "react";
import { PropsWithChildren, useState } from "react";
import { TalentTreeOptionsContext } from "./constants";

function TalentWeightContextProvider(props: PropsWithChildren) {
  const [talentWeight, setTalentWeight] = useState<"flat" | "exponential">(
    "exponential"
  );
  const [includeHeroTalents, setIncludeHeroTalents] = useState<boolean>(true);
  return (
    <TalentTreeOptionsContext.Provider
      value={{
        talentWeight,
        setTalentWeight,
        includeHeroTalents,
        setIncludeHeroTalents,
      }}
    >
      {props.children}
    </TalentTreeOptionsContext.Provider>
  );
}

export { TalentWeightContextProvider };
