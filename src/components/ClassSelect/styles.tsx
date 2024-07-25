import React from "react";
import {
  ButtonBase,
  Tooltip,
  TooltipProps,
  styled as muiStyled,
  tooltipClasses,
} from "@mui/material";
import { ClassButtonProps } from "./types";
import styled from "@emotion/styled";
import { ClassColors } from "../../styles/classColors";

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
)<ClassColorTooltipProps>(({ classColor }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    color: ClassColors[classColor],
    backgroundColor: "#2F2F2F",
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: "#2F2F2F",
  },
}));

export { ClassButton, ClassColorTooltip };
