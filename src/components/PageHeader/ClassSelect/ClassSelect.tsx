import React, { useMemo } from "react";
import { Menu } from "@mui/material";
import { CLASSES } from "../../../api/WorldOfWarcraftClasses/constants";
import { Specialization } from "../../../api/WorldOfWarcraftSpecializations/types";
import { SpecializationDropdownItem } from "./SpecializationDropdownItem/SpecializationDropdownItem";
import { ClassColors } from "../../../styles/classColors";
import { ClassProps } from "./types";
import { useClassAndSpec } from "../../../context/ClassAndSpec/useClassAndSpec";
import { ClassButton, ClassColorTooltip } from "./styles";

function ClassSelect(props: ClassProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { setCurrentClass, setCurrentSpec } = useClassAndSpec();
  const open = Boolean(anchorEl);
  const currentClassSpecs: Specialization[] = useMemo(
    () =>
      CLASSES.find((val) => {
        return props.class.id === val.id;
      })!.specs,
    [props.class]
  );

  const handleClose = (spec: Specialization) => () => {
    setAnchorEl(null);
    setCurrentClass(props.class);
    setCurrentSpec(spec);
  };

  const handleClickAway = () => {
    setAnchorEl(null);
  };

  const handleButtonClick: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <ClassColorTooltip
        classColor={props.class.name as keyof typeof ClassColors}
        title={props.class.name}
        placement="top"
        arrow
      >
        <ClassButton
          classImage={props.class.image}
          onClick={handleButtonClick}
          name={props.class.name}
        />
      </ClassColorTooltip>
      <Menu
        open={open}
        onClose={handleClickAway}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
      >
        {currentClassSpecs.map((specialization) => {
          return (
            <SpecializationDropdownItem
              onClick={handleClose}
              specialization={specialization}
              key={specialization.name}
            />
          );
        })}
      </Menu>
    </>
  );
}

export { ClassSelect };
