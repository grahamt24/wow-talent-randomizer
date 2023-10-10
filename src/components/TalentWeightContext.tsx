import React, {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";

export interface TalentWeightContextType {
  talentWeight: "flat" | "exponential"
  setTalentWeight: Dispatch<SetStateAction<"flat" | "exponential">>;
}

const TalentWeightContext: React.Context<TalentWeightContextType> =
  React.createContext<TalentWeightContextType>({
    talentWeight: "exponential",
    setTalentWeight: () => {}
  });

export function TalentWeightContextProvider(props: PropsWithChildren) {
  const [talentWeight, setTalentWeight] = useState<"flat" | "exponential">("exponential");
  return (
    <TalentWeightContext.Provider
      value={{
        talentWeight,
        setTalentWeight
      }}
    >
      {props.children}
    </TalentWeightContext.Provider>
  );
}

export function useTalentWeight() {
  return useContext(TalentWeightContext);
}
