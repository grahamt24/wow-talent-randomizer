import React from "react";
import { Select, MenuItem, SelectChangeEvent, InputLabel, FormControl } from "@mui/material";
import { useTalentWeight, TalentWeightContextType } from "./TalentWeightContext";

export function TalentWeightSelect() {
  const { talentWeight, setTalentWeight } = useTalentWeight();
  const handleChange = (event: SelectChangeEvent) => {
    setTalentWeight(event.target.value as TalentWeightContextType["talentWeight"])
  }
  return (
    <FormControl sx={{ width: "25%" }}>
      <InputLabel id="talent-weight-select-label">Talent Weight</InputLabel>
        <Select labelId="talent-weight-select-label" id="talent-weight-select" value={talentWeight} label="Talent Weight" variant="outlined" onChange={handleChange}>
          <MenuItem value="exponential">Exponential</MenuItem>
          <MenuItem value="flat">Flat</MenuItem>
        </Select>
    </FormControl>
  )
}