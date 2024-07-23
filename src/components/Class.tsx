import React, { useMemo } from "react";
import styled from "@emotion/styled";
import { Class } from "../api/Classes/Class";
import { styled as muiStyled } from "@mui/material/styles";
import {
  Tooltip,
  TooltipProps,
  tooltipClasses,
  ButtonBase,
  Menu
} from "@mui/material";
import { CLASSES } from "../api/Classes/ClassList";
import { Specialization } from "../api/Specializations/Specialization";
import { SpecializationDropdownItem } from "./SpecializationDropdownItem";
import { ClassColors } from "./classColors";
import { useClassAndSpec } from "./ClassAndSpecContext/ClassAndSpecContext";

export interface ClassProps {
  class: Class;
}

interface ClassButtonProps {
  classImage: string;
}

const ClassButton = styled(ButtonBase, {
  shouldForwardProp: (propName) => propName !== "classImage",
})<ClassButtonProps>`
  && {
    background-image: url(${(props) => props.classImage});
    background-repeat: no-repeat;
    background-size: 45px;
    height: 45px;
    width: 45px;
    border-radius: 25%;
  }
`;

interface ClassColorTooltipProps {
  classColor: keyof typeof ClassColors;
}

const ClassColorTooltip = muiStyled(
  ({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ),
  {
    shouldForwardProp: (propName) => propName !== "classColor",
  }
)<ClassColorTooltipProps>(({ classColor, theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    color: ClassColors[classColor],
    backgroundColor: "#2F2F2F",
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: "#2F2F2F",
  },
}));

export function ClassComponent(props: ClassProps) {
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
  }

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
