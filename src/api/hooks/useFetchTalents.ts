import { randomizeTalents } from "../../utils/randomizeTalents";
import { Talents } from "../BlizzardAPI/types";
import { convertTalentData } from "../BlizzardAPI/convertTalentData";
import { useTalentTrees } from "../../context/TalentTrees/useTalentTrees";
import { TalentWeightContextType } from "../../context/TalentWeight/types";
import { useEffect, useState } from "react";

/**
 * Fetches and processes talents for a given class and specialization.
 *
 * @param classId - The ID of the class for which to fetch talents. Optional.
 * @param specId - The ID of the specialization for which to fetch talents. Optional.
 * @param weighting - The method of weighting talents, either "flat" or "exponential". Defaults to "exponential".
 * @param randomize - A boolean indicating whether to randomize the talents. Defaults to true.
 * @returns An object containing the class and specialization talents.
 */
function useFetchTalents(
  classId?: number,
  specId?: number,
  weighting: TalentWeightContextType["talentWeight"] = "exponential",
  randomize: boolean = true
) {
  const { talentTrees } = useTalentTrees();
  const [talents, setTalents] = useState<Talents>({
    classTalents: [],
    specTalents: [],
  });
  const fetchTalents = () => {
    if (!classId || !specId) {
      setTalents({
        classTalents: [],
        specTalents: [],
      });
      return;
    }

    const { spec_talent_nodes, class_talent_nodes, restriction_lines, id } =
      talentTrees[classId][specId];

    let restrictions = restriction_lines;
    // for some reason, Evoker has display_row start at 4, so we need to account for that in restriction lines too
    if (classId === 13) {
      restrictions = restriction_lines.map((restr) => {
        return {
          ...restr,
          restricted_row: restr.restricted_row - 3
        }
      })
    }

    const convertedClassTalents = convertTalentData(
      class_talent_nodes,
      id,
      true
    );
    const convertedSpecTalents = convertTalentData(
      spec_talent_nodes,
      id,
      false
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

    setTalents({
      classTalents: randomize ? randomizedClassTalents : convertedClassTalents,
      specTalents: randomize ? randomizedSpecTalents : convertedSpecTalents,
    });
  };

  useEffect(() => {
    fetchTalents(); // Fetch talents on mount or when classId/specId changes
  }, [classId, specId, weighting, randomize]);

  return {
    ...talents,
    rerandomize: fetchTalents,
  };
}

export { useFetchTalents };
