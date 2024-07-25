import React from "react";
import { ClassSelect } from "../ClassSelect/ClassSelect";
import { CLASSES } from "../../api/WorldOfWarcraftClasses/constants";
import { TalentWeightSelect } from "./TalentWeight/TalentWeightSelect";
import { ClassListWrapper, SelectWrapper } from "./styles";

function PageHeader() {
  return (
    <>
      <SelectWrapper>
        <TalentWeightSelect />
      </SelectWrapper>
      <ClassListWrapper>
        {CLASSES.map((value) => {
          return <ClassSelect class={value} key={value.id} />;
        })}
      </ClassListWrapper>
    </>
  );
}

export { PageHeader };
