import { randomizeTalents } from "../../utils/randomizeTalents";
import { Talents } from "../BlizzardAPI/types";
import { convertTalentData } from "../BlizzardAPI/convertTalentData";
import { useTalentTrees } from "../../context/TalentTrees/useTalentTrees";
import { TalentTreeOptionsContextType } from "../../context/TalentTreeOptions/types";
import { useEffect, useState } from "react";

/**
 * Fetches and processes talents for a given class and specialization.
 *
 * @param classId - The ID of the class for which to fetch talents. Optional.
 * @param specId - The ID of the specialization for which to fetch talents. Optional.
 * @param weighting - The method of weighting talents, either "flat" or "exponential". Defaults to "exponential".
 * @param includeHeroTalents - Should include hero talents in the randomization. Defaults to false
 * @returns An object containing the class and specialization talents.
 */
function useFetchTalents(
  classId?: number,
  specId?: number,
  weighting: TalentTreeOptionsContextType["talentWeight"] = "exponential",
  includeHeroTalents: boolean = false
) {
  const { talentTrees } = useTalentTrees();
  const [talents, setTalents] = useState<Talents>({
    classTalents: [],
    specTalents: [],
    heroTalents: [],
  });
  const fetchTalents = () => {
    if (!classId || !specId) {
      setTalents({
        classTalents: [],
        specTalents: [],
        heroTalents: [],
      });
      return;
    }
    const {
      spec_talent_nodes,
      class_talent_nodes,
      restriction_lines,
      id,
      hero_talent_trees,
      playable_specialization,
    } = talentTrees[classId][specId];

    // Filter out nodes present in hero_talent_trees
    const filteredSpecTalents = spec_talent_nodes.filter(
      (node) =>
        !hero_talent_trees.some((heroTree) =>
          heroTree.hero_talent_nodes.some((heroNode) => heroNode.id === node.id)
        )
    );
    const filteredClassTalents = class_talent_nodes.filter(
      (node) =>
        !hero_talent_trees.some((heroTree) =>
          heroTree.hero_talent_nodes.some((heroNode) => heroNode.id === node.id)
        )
    );

    // Simplified heroTrees creation
    const heroTrees = hero_talent_trees.filter((heroTree) =>
      heroTree.playable_specializations.some((spec) => spec.id === specId)
    );

    let restrictions = restriction_lines;
    // for some reason, Evoker has display_row start at 4, so we need to account for that in restriction lines too
    if (classId === 13) {
      restrictions = restriction_lines.map((restr) => {
        return {
          ...restr,
          restricted_row: restr.restricted_row - 3,
        };
      });
    } else if (classId !== 8) {
      // every class but Mage has an extra row since TWW Pre Patch, so we need to account for that in restriction lines too
      restrictions = restriction_lines.map((restr) => {
        return {
          ...restr,
          restricted_row: restr.restricted_row - 1,
        };
      });
    }

    const convertedClassTalents = convertTalentData(
      filteredClassTalents,
      id,
      true,
      false,
      playable_specialization.name
    );
    const convertedSpecTalents = convertTalentData(
      filteredSpecTalents,
      id,
      false,
      false,
      playable_specialization.name
    );
    const selectedHeroTalentTree = heroTrees[Math.floor(Math.random() * 2)];
    const convertedHeroTalents = convertTalentData(
      selectedHeroTalentTree.hero_talent_nodes,
      id,
      false,
      true,
      selectedHeroTalentTree.name
        .replace(/[<>:"/\\|?*]/g, "") // Remove invalid characters
        .replace(/'/g, "") // Remove apostrophes
    );

    const randomizedClassTalents = randomizeTalents(
      convertedClassTalents,
      restrictions,
      weighting,
      true
    );
    const randomizedSpecTalents = randomizeTalents(
      convertedSpecTalents,
      restrictions,
      weighting,
      false
    );
    // not really randomized since there are 10 available points for hero and there are 10 nodes, so just select them all
    const randomizedHeroTalents = convertedHeroTalents.map((talent) => {
      return {
        ...talent,
        rank: talent.totalRanks,
        partiallySelected: false,
      };
    });

    setTalents({
      classTalents: randomizedClassTalents,
      specTalents: randomizedSpecTalents,
      heroTalents: includeHeroTalents ? randomizedHeroTalents : [],
    });
  };

  useEffect(() => {
    fetchTalents();
  }, [classId, specId, weighting]);

  useEffect(() => {
    if (includeHeroTalents) {
      fetchTalents();
    } else {
      setTalents({
        ...talents,
        heroTalents: [],
      });
    }
  }, [includeHeroTalents]);

  return {
    ...talents,
    rerandomize: fetchTalents,
  };
}

export { useFetchTalents };
