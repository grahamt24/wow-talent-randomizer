import { useContext } from "react";
import { ClassAndSpecContext } from "./constants";

function useClassAndSpec() {
  const context = useContext(ClassAndSpecContext);
  if (!context) {
    throw new Error(
      "useClassAndSpec must be used within a ClassAndSpecProvider"
    );
  }
  return context;
}

export { useClassAndSpec };
