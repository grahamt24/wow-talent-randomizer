import { Specialization } from "../../../../api/WorldOfWarcraftSpecializations/types";

interface SpecializationDropdownItemProps {
  specialization: Specialization;
  onClick: (spec: Specialization) => () => void;
  autoFocus?: boolean;
}

export type { SpecializationDropdownItemProps };
