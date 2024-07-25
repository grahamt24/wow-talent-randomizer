import { TalentNode } from "../../../api/BlizzardAPI/types";

interface NodeProps {
  node: TalentNode;
  className: string;
  specName: string;
}

interface NodeButtonProps {
  nodeImage: string;
  passive?: boolean;
  maxRank?: boolean;
}

export type { NodeProps, NodeButtonProps };
