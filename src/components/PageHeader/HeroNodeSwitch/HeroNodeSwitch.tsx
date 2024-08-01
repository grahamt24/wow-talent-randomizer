import React from "react";
import { useTalentTreeOptions } from "../../../context/TalentTreeOptions/useTalentTreeOptions";
import { Switch, FormControlLabel } from "@mui/material";
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
      <FormControlLabel
        control={
          <Switch checked={includeHeroTalents} onChange={handleChange} />
        }
        labelPlacement="top"
        label="Include Hero Talents?"
      />
    </SwitchWrapper>
  );
}

export { HeroNodeSwitch };
