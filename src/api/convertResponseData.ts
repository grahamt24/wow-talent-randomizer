import { TalentNode } from "../components/TalentTrees/TalentNode";

export interface ResponseData {
  class: string;
  classSpentPoints: number;
  class_talents: TalentData;
  spec: string;
  specSpentPoints: number;
  specLow: [number, number];
  spec_talents: TalentData;
  totalPoints: number;
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
    }
  };
  talent: {
    id: number;
    key: {
      href: string;
    };
    name: string;
  }
}

interface TalentRank {
  rank: number;
  tooltip: Tooltip
}

interface ChoiceTalent {
  choice_of_tooltips: [Tooltip, Tooltip]
}

export interface TalentData {
  [talentId: string]: {
    display_col: number;
    display_row: number;
    id: number;
    image_urls: [string];
    locked_by: number[];
    node_type: {
      id: number;
      type: "ACTIVE" | "PASSIVE";
    };
    rank: number;
    ranks: TalentRank[] | ChoiceTalent[];
    unlocks: number[];
  };
}

export interface Talents {
  classTalents: TalentNode[];
  specTalents: TalentNode[];
}

function isChoiceNode(node: ChoiceTalent | TalentRank): node is ChoiceTalent {
  return (node as ChoiceTalent).choice_of_tooltips !== undefined;
}

export function convertTalentDataToTalentNode(
  talentData: TalentData,
): TalentNode[] {
  return Object.keys(talentData).map((key) => {
    const currTalentData = talentData[key];
    const normalizedRank = currTalentData.rank - 1 < 0 ? 0 : currTalentData.rank - 1;
    let name;
    let description;
    let node = currTalentData.ranks[normalizedRank];
    let type: TalentNode["type"];
    if (isChoiceNode(node)) {
      const choiceTalent = node.choice_of_tooltips[Math.floor(Math.random()*2)]
      name = choiceTalent.talent.name;
      description = choiceTalent.spell_tooltip.description;
      type = choiceTalent.spell_tooltip.cast_time.toLowerCase() === "passive" ? "passive" : "active";
    } else {
      description = node.tooltip.spell_tooltip.description
      name = node.tooltip.talent.name;
      type = currTalentData.node_type.type.toLowerCase() as TalentNode["type"];
    }

    const talentNode: TalentNode = {
      id: currTalentData.id,
      name,
      description,
      image: currTalentData.image_urls[0],
      type,
      rank: currTalentData.rank,
      totalRanks: currTalentData.ranks.length,
      lockedBy: currTalentData.locked_by,
      unlocks: currTalentData.unlocks,
      row: currTalentData.display_row,
      column: currTalentData.display_col,
    };
    return talentNode;
  });
}
