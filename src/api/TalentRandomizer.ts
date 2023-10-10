import axios from "axios";
import { TalentWeightContextType } from "../components/TalentWeightContext";
import {
  Talents,
  ResponseData,
  convertTalentDataToTalentNode,
} from "./convertResponseData";

export function fetchTalentRandomizer(
  className: string | undefined,
  specName: string | undefined,
  classPoints = 31, // level 60 default,
  specPoints = 30,
  weighting: TalentWeightContextType["talentWeight"] = "exponential"
): Promise<Talents> {
  return axios
    .get<ResponseData>(
      encodeURI(
        `http://api.lameone.me/talent_randomizer?class_points=${classPoints}&spec_points=${specPoints}&spec=${specName}&class=${className}&weighting=${weighting}`
      )
    )
    .then((res) => {
      const { spec_talents, class_talents } = res.data;
      const convertedClassTalents = convertTalentDataToTalentNode(class_talents);
      const convertedSpecTalents = convertTalentDataToTalentNode(spec_talents);
      return {
        classTalents: convertedClassTalents,
        specTalents: convertedSpecTalents,
      };
    });
}
