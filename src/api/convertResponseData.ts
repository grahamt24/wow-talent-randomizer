import { TalentNode } from "../components/TalentTrees/TalentNode";
import { getAndDownloadImage } from "./getAndDownloadImage";

export interface RestrictionLine {
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

export interface ResponseData {
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

export interface TalentData {
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

export interface Connections {
  from: TalentNode;
  to: TalentNode;
}

export interface Talents {
  classTalents: TalentNode[];
  specTalents: TalentNode[];
}

function isChoiceNode(node: ChoiceTalent | TalentRank): node is ChoiceTalent {
  return (node as ChoiceTalent).choice_of_tooltips !== undefined;
}

export function convertTalentDataToTalentNode(
  talentData: TalentData[],
  id: number,
  isClassTalent: boolean,
): TalentNode[] {
  return talentData
    .map((talent) => {
      if (!talent.ranks || talent.ranks.length === 0) {
        // Skip this talent if ranks do not exist or are empty
        return null;
      }

      let name;
      let description;
      let node = talent.ranks[talent.ranks.length - 1];
      let type: TalentNode["type"];
      let row = talent.display_row;
      let spellId;
      let rank = 0;
      let choiceNode = false;
      let choiceIndex = 0;
      let isDefaultNode = false;

      if (isChoiceNode(node)) {
        const choiceIndex = Math.floor(Math.random() * 2)
        const choiceTalent =
          node.choice_of_tooltips[choiceIndex];
        name = choiceTalent.talent.name;
        description = choiceTalent.spell_tooltip.description;
        type =
          choiceTalent.spell_tooltip.cast_time.toLowerCase() === "passive"
            ? "passive"
            : "active";
        spellId = choiceTalent.spell_tooltip.spell.id;
        choiceNode = true;
        choiceIndex
      } else {
        description = node.tooltip.spell_tooltip.description;
        name = node.tooltip.talent.name;
        type = talent.node_type.type.toLowerCase() as TalentNode["type"];
        spellId = node.tooltip.spell_tooltip.spell.id;
        if (node.default_points) {
          rank = node.default_points;
          isDefaultNode = true;
        }
      }

      // for some reason, Evoker has display_row start at 4
      if (id === 872) {
        row = row - 3;
      }

      const talentNode: TalentNode = {
        id: talent.id,
        name,
        description,
        type,
        totalRanks: talent.ranks.length,
        rank,
        lockedBy: talent.locked_by,
        unlocks: talent.unlocks || [],
        row,
        column: talent.display_col,
        spellId,
        isClassTalent,
        choiceNode,
        choiceIndex,
        isDefaultNode,
      };
      return talentNode;
    })
    .filter((talentNode) => talentNode !== null) as TalentNode[]; // Filter out null values
}
