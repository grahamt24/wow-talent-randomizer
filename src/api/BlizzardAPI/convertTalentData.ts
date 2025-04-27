import { getAndDownloadImage } from "./getAndDownloadImage";
import {
  ChoiceTalent,
  PlayableSpecialization,
  TalentData,
  TalentNode,
  TalentRank,
} from "./types";

function isChoiceNode(node: ChoiceTalent | TalentRank): node is ChoiceTalent {
  return (node as ChoiceTalent).choice_of_tooltips !== undefined;
}

/**
 * Converts an array of talent data into an array of talent nodes.
 *
 * @param talentData - An array of talent data to be converted.
 * @param id - The identifier for the talent tree.
 * @param isClassTalent - A boolean indicating if the talents are class talents.
 * @returns An array of TalentNode objects representing the converted talent data.
 */
function convertTalentData(
  talentData: TalentData[],
  id: number,
  isClassTalent: boolean,
  isHeroTalent: boolean,
  specialization: PlayableSpecialization,
  className: string,
  accessToken: string
): TalentNode[] {
  return talentData
    .map((talent) => {
      if (!talent.ranks || talent.ranks.length === 0) {
        // Skip this talent if ranks do not exist or are empty
        return null;
      }

      if (
        (talent.ranks[0] as ChoiceTalent).choice_of_tooltips === undefined &&
        (talent.ranks[0] as TalentRank).tooltip === undefined
      ) {
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
        getAndDownloadImage(node.choice_of_tooltips[ind].spell_tooltip.spell.key.href, accessToken, className, specialization.name)
      } else {
        description = node.tooltip.spell_tooltip.description;
        name = node.tooltip.talent.name;
        type = talent.node_type.type.toLowerCase() as TalentNode["type"];
        spellId = node.tooltip.spell_tooltip.spell.id;
        if (node.default_points) {
          rank = node.default_points;
          isDefaultNode = true;
        }
        getAndDownloadImage(node.tooltip.spell_tooltip.spell.key.href, accessToken, className, specialization.name)
      }

      // Druid specific logic -- For some reaosn moonkin form is included but it's not a talent...
      if (id === 793) {
        // Starfire has 2 talents returned for Feral/Guardian, but only 91044 is the one that has the correct data...
        if (
          (specialization.id === 103 || specialization.id === 104) &&
          talent.id === 91046
        ) {
          return null;
        }
      }

      // Evoker specific - for some reason the Mass Eruption/Mass Disintegrate is included in both the trees for Devastation/Augmentation
      // so we want to not include that one for the other spec
      if (id === 872) {
        if (specialization.id === 1467 && name === "Mass Eruption") {
          return null;
        }

        if (specialization.id === 1473 && name === "Mass Disintegrate") {
          return null;
        }
      }

      // Mage Specific logic -- for some reason, Frost mages have a spec specific talent included in their class talents...
      if (id === 658) {
        if (specialization.id === 64 && isClassTalent && talent.id === 62162) {
          return null;
        }
      }

      // for some reason, Evoker has display_row start at 4
      if (id === 872) {
        row = row - 3;
      } else if (id !== 658) {
        // every class but mage has an extra row since TWW Pre Patch
        row = row - 1;
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
        isHeroNode: isHeroTalent,
        heroClassName: specialization.name || "",
      };
      return talentNode;
    })
    .filter((talentNode) => talentNode !== null) as TalentNode[]; // Filter out null values
}

export { convertTalentData };
