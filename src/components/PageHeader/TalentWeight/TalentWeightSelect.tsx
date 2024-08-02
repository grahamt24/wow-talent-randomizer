import React from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Tooltip,
  Typography,
} from "@mui/material";
import { useTalentTreeOptions } from "../../../context/TalentTreeOptions/useTalentTreeOptions";
import { TalentTreeOptionsContextType } from "../../../context/TalentTreeOptions/types";
import { Info } from "@mui/icons-material";
import { LabelAndIconWrapper } from "./styles";

function TalentWeightSelect() {
  const { talentWeight, setTalentWeight } = useTalentTreeOptions();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setTalentWeight(
      event.target.value as TalentTreeOptionsContextType["talentWeight"]
    );
  };

  return (
    <FormControl sx={{ width: "35%", alignSelf: "center" }}>
      <FormLabel id="talent-weight-label">
        Talent Randomization Weight
      </FormLabel>
      <RadioGroup
        aria-labelledby="talent-weight-label"
        value={talentWeight}
        onChange={handleChange}
      >
        <LabelAndIconWrapper>
          <FormControlLabel
            control={<Radio />}
            label="Exponential"
            value="exponential"
          />
          <Tooltip
            title={
              <Typography variant="caption">
                This setting will put more weight on nodes further down the tree
                so they are more likely to be selected as they become available.
              </Typography>
            }
          >
            <Info fontSize="small" data-testid="exponential-info-icon" />
          </Tooltip>
        </LabelAndIconWrapper>
        <LabelAndIconWrapper>
          <FormControlLabel control={<Radio />} label="Flat" value="flat" />
          <Tooltip
            title={
              <Typography variant="caption">
                This setting will make all talents have an equal chance to be
                selected, regardless of location in the tree.
              </Typography>
            }
          >
            <Info fontSize="small" data-testid="flat-info-icon" />
          </Tooltip>
        </LabelAndIconWrapper>
      </RadioGroup>
    </FormControl>
  );
}

export { TalentWeightSelect };
