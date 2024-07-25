import { ChoiceTalent, TalentData, TalentNode, TalentRank } from "./types";

function isChoiceNode(node: ChoiceTalent | TalentRank): node is ChoiceTalent {
  return (node as ChoiceTalent).choice_of_tooltips !== undefined;
}

/**
 * Converts an array of talent data into an array of talent nodes.
 *
 * @param talentData - An array of talent data to be converted.
 * @param id - The identifier for the talent tree or class.
 * @param isClassTalent - A boolean indicating if the talents are class talents.
 * @returns An array of TalentNode objects representing the converted talent data.
 */
function convertTalentData(
  talentData: TalentData[],
  id: number,
  isClassTalent: boolean
): TalentNode[] {
  return talentData
    .map((talent) => {
      if (!talent.ranks || talent.ranks.length === 0) {
        // Skip this talent if ranks do not exist or are empty
        return null;
      }

      let name;
      let description;
      const node = talent.ranks[talent.ranks.length - 1];
      let type: TalentNode["type"];
      let row = talent.display_row;
      let spellId;
      let rank = 0;
      let choiceNode = false;
      let choiceIndex = 0;
      let isDefaultNode = false;

      if (isChoiceNode(node)) {
        const ind = Math.floor(Math.random() * 2);
        const choiceTalent = node.choice_of_tooltips[ind];
        name = choiceTalent.talent.name;
        description = choiceTalent.spell_tooltip.description;
        type =
          choiceTalent.spell_tooltip.cast_time.toLowerCase() === "passive"
            ? "passive"
            : "active";
        spellId = choiceTalent.spell_tooltip.spell.id;
        choiceNode = true;
        choiceIndex = ind;
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

export { convertTalentData };
