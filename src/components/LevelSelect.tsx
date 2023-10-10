import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useClassAndSpec } from "./ClassAndSpecContext/ClassAndSpecContext";

interface AutocompleteOption {
  label: string;
  id: number;
}

export function LevelSelect() {
  const { setClassLevel } = useClassAndSpec();
  const handleChange = React.useMemo(() => (event: React.SyntheticEvent, value: AutocompleteOption, reason: string) => {
    if (reason === "selectOption") {
      setClassLevel(value.id);
    }
    if (reason === "clear") {
      setClassLevel(70);
    }
  }, []);

  const allLevels = React.useMemo(() => {
    let levels: AutocompleteOption[] = [];
    for (let i = 10; i <= 70; i++) {
      levels.push(
        {
          label: i.toString(),
          id: i
        }
      )
    }
    return levels;
  }, [])

  return (
    // @ts-ignore
    <Autocomplete sx={{ width: "30%", paddingBottom: "24px" }} disablePortal renderInput={(params) => <TextField {...params} label="Level"/>} id="level_input" options={allLevels} onChange={handleChange} />
  )
}