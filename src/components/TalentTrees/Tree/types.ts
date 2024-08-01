import { Connections, TalentNode } from "../../../api/BlizzardAPI/types";
import { Class } from "../../../api/WorldOfWarcraftClasses/types";
import { Specialization } from "../../../api/WorldOfWarcraftSpecializations/types";
import { MinAndMaxColumnAndRows } from "../types";

interface TreeProps {
  dimensions: MinAndMaxColumnAndRows;
  grid: Array<Array<number | TalentNode>>
  connections: Connections[];
  currentClass: Class;
  currentSpec: Specialization;
}

export type { TreeProps }