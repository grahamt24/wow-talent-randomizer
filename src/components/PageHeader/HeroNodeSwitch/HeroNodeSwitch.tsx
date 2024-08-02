import React from "react";
import { useTalentTreeOptions } from "../../../context/TalentTreeOptions/useTalentTreeOptions";
import { Switch, FormControlLabel, Tooltip, Typography } from "@mui/material";
import { SwitchWrapper } from "./styles";

function HeroNodeSwitch() {
  const { includeHeroTalents, setIncludeHeroTalents } = useTalentTreeOptions();
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setIncludeHeroTalents(checked);
  };

  return (
    <SwitchWrapper>
      <Tooltip
        title={
          <Typography variant="caption">
            One of the two available hero specializations for the selected class
            and specialization will be randomly chosen.
          </Typography>
        }
      >
        <FormControlLabel
          control={
            <Switch checked={includeHeroTalents} onChange={handleChange} />
          }
          labelPlacement="top"
          label="Include Hero Talents"
        />
      </Tooltip>
    </SwitchWrapper>
  );
}

export { HeroNodeSwitch };
