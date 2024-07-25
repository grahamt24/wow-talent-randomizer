import { Specialization } from "../WorldOfWarcraftSpecializations/types";

interface Class {
  id: number;
  talentTreeId: number;
  name: string;
  specs: Specialization[];
  image: string;
}

export type { Class };
