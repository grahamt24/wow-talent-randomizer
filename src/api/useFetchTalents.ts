import axios from "axios";
import { TalentWeightContextType } from "../components/TalentWeightContext";
import { Talents, convertTalentDataToTalentNode } from "./convertResponseData";
import { randomizeTalents } from "./randomizeTalents";
import { useTalentTrees } from "./talentTrees";

export function useFetchTalents(
  classId?: number,
  specId?: number,
  weighting: TalentWeightContextType["talentWeight"] = "exponential",
  randomize: boolean = true
): Talents {
  const { talentTrees } = useTalentTrees();
  if (!classId || !specId) {
    return {
      classTalents: [],
      specTalents: [],
    };
  }

  const { spec_talent_nodes, class_talent_nodes, restriction_lines, id } =
    talentTrees[classId][specId];

  const convertedClassTalents = convertTalentDataToTalentNode(
    class_talent_nodes,
    id,
    true
  );
  const convertedSpecTalents = convertTalentDataToTalentNode(
    spec_talent_nodes,
    id,
    false
  );

  const randomizedClassTalents = randomizeTalents(
    convertedClassTalents,
    restriction_lines,
    weighting,
    true
  );
  const randomizedSpecTalents = randomizeTalents(
    convertedSpecTalents,
    restriction_lines,
    weighting,
    false
  );
  return {
    classTalents: randomize ? randomizedClassTalents : convertedClassTalents,
    specTalents: randomize ? randomizedSpecTalents : convertedSpecTalents,
  };
}
