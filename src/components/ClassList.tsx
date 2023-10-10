import React from "react";
import styled from "@emotion/styled";
import { ClassComponent } from "./Class";
import { CLASSES } from "../api/Classes/ClassList";
import { LevelSelect } from "./LevelSelect";
import { TalentWeightSelect } from "./TalentWeightSelect";

const ClassListDiv = styled("div")`
  display: flex;
  column-gap: 32px;
  justify-content: center;
  width: 100%;
  flex: 1;
  max-height: 200px;
`;

const SelectWrapper = styled("div")`
  display: flex;
  justify-content: space-evenly;
`

export function ClassList() {
  return (
    <>
      <SelectWrapper>
        <LevelSelect />
        <TalentWeightSelect />
      </SelectWrapper>
      <ClassListDiv>
        {CLASSES.map((value) => {
          return <ClassComponent class={value} key={value.id} />;
        })}
      </ClassListDiv>
    </>
  );
}
