import React from "react";
import { ClassSelect } from "./ClassSelect/ClassSelect";
import { CLASSES } from "../../api/WorldOfWarcraftClasses/constants";
import { TalentWeightSelect } from "./TalentWeight/TalentWeightSelect";
import { ClassListWrapper, TalentTreeOptionsWrapper } from "./styles";
import { HeroNodeSwitch } from "./HeroNodeSwitch/HeroNodeSwitch";

function PageHeader() {
  return (
    <>
      <TalentTreeOptionsWrapper>
        <TalentWeightSelect />
        <HeroNodeSwitch />
      </TalentTreeOptionsWrapper>
      <ClassListWrapper>
        {CLASSES.map((value) => {
          return <ClassSelect class={value} key={value.id} />;
        })}
      </ClassListWrapper>
    </>
  );
}

export { PageHeader };
