interface RestrictionLine {
  is_for_class: boolean;
  required_points: number;
  restricted_row: number;
}

interface PlayableClass {
  id: number;
  name: string;
}

interface PlayableSpecialization {
  id: number;
  name: string;
}

interface ResponseData {
  class_talent_nodes: TalentData[];
  spec_talent_nodes: TalentData[];
  restriction_lines: RestrictionLine[];
  id: number;
  playable_class: PlayableClass;
  playable_specialization: PlayableSpecialization;
}

interface Tooltip {
  spell_tooltip: {
    cast_time: string;
    cooldown: string;
    description: string;
    spell: {
      id: number;
      key: {
        href: string;
      };
      name: string;
    };
  };
  talent: {
    id: number;
    key: {
      href: string;
    };
    name: string;
  };
}

interface TalentRank {
  rank: number;
  default_points: number;
  tooltip: Tooltip;
}

interface ChoiceTalent {
  choice_of_tooltips: [Tooltip, Tooltip];
}

interface TalentData {
  display_col: number;
  display_row: number;
  id: number;
  locked_by: number[];
  node_type: {
    id: number;
    type: "ACTIVE" | "PASSIVE";
  };
  ranks: TalentRank[] | ChoiceTalent[];
  unlocks?: number[];
  isClassTalent: boolean;
  choiceNode: boolean;
}

interface TalentNode {
  id: number;
  name: string;
  description: string;
  totalRanks: number;
  rank: number;
  type: "active" | "passive";
  lockedBy?: number[];
  unlocks: number[];
  row: number;
  column: number;
  spellId: number;
  isClassTalent: boolean;
  partiallySelected?: boolean;
  choiceNode: boolean;
  choiceIndex: number;
  isDefaultNode: boolean;
}

interface Connections {
  from: TalentNode;
  to: TalentNode;
}

interface Talents {
  classTalents: TalentNode[];
  specTalents: TalentNode[];
}

export type {
  RestrictionLine,
  PlayableClass,
  PlayableSpecialization,
  ResponseData,
  Tooltip,
  TalentRank,
  ChoiceTalent,
  TalentData,
  TalentNode,
  Connections,
  Talents,
};
