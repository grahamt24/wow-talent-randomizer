import React from "react";
import { CustomMenuItem, SpecImage } from "./styles";
import { SpecializationDropdownItemProps } from "./types";

function SpecializationDropdownItem(props: SpecializationDropdownItemProps) {
  return (
    <CustomMenuItem onClick={props.onClick(props.specialization)}>
      <SpecImage alt={`${props.specialization.name} icon`} src={props.specialization.specIcon} />
      {props.specialization.name}
    </CustomMenuItem>
  );
}

export { SpecializationDropdownItem };
