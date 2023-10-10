import React from "react";
import styled from "@emotion/styled";
import { Specialization } from "../api/Specializations/Specialization";

import { MenuItem } from "@mui/material";

export interface SpecializationDropdownItemProps {
  specialization: Specialization;
  onClick: (spec: Specialization) => () => void;
}

const SpecImage = styled("img")`
  height: 25px;
  width: 25px;
  border-radius: 50%;
`;

const CustomMenuItem = styled(MenuItem)`
  display: flex;
  column-gap: 8px;
`;

export function SpecializationDropwdownItem(
  props: SpecializationDropdownItemProps
) {
  return (
    <CustomMenuItem onClick={props.onClick(props.specialization)}>
      <SpecImage src={props.specialization.specIcon} />
      {props.specialization.name}
    </CustomMenuItem>
  );
}
