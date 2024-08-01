import React, { useEffect } from "react";
import { useFetchTalents } from "../../api/hooks/useFetchTalents";
import { Button, Tooltip, Typography } from "@mui/material";
import Shuffle from "@mui/icons-material/Shuffle";
import { useClassAndSpec } from "../../context/ClassAndSpec/useClassAndSpec";
import { useTalentTreeOptions } from "../../context/TalentTreeOptions/useTalentTreeOptions";
import {
  AlertWrapper,
  ButtonWrapper,
  HeroClassImage,
  HeroClassWrapper,
  StyledAlert,
  TalentTreeWrapper,
} from "./styles";
import { buildGrid, getHeroTreeIcon, getMaxAndMinColumnAndRow } from "./utils";
import { TalentTreeLoading } from "./TalentTreeLoading/TalentTreeLoading";
import { Tree } from "./Tree/Tree";
// import { exportTalentTree } from "../../utils/exportTalentTree";

function TalentTree() {
  const { currentClass, currentSpec } = useClassAndSpec();
  const { talentWeight, includeHeroTalents } = useTalentTreeOptions();
  const { classTalents, specTalents, heroTalents, rerandomize } =
    useFetchTalents(
      currentClass?.id,
      currentSpec?.id,
      talentWeight,
      includeHeroTalents
    );

  useEffect(() => {
    if (includeHeroTalents) {
      rerandomize();
    }
  }, [includeHeroTalents]);

  if (!currentClass || !currentSpec) {
    return (
      <AlertWrapper>
        <StyledAlert severity="info">
          Please choose a specialization above to randomize!
        </StyledAlert>
      </AlertWrapper>
    );
  }

  if (
    classTalents.length === 0 ||
    specTalents.length === 0 ||
    (includeHeroTalents && heroTalents.length === 0)
  ) {
    return <TalentTreeLoading />;
  }

  const classGridDimensions = getMaxAndMinColumnAndRow(classTalents);
  const { grid: classGrid, connections: classConnections } = buildGrid(
    classGridDimensions,
    classTalents
  );

  const specGridDimensions = getMaxAndMinColumnAndRow(specTalents);
  const { grid: specGrid, connections: specConnections } = buildGrid(
    specGridDimensions,
    specTalents
  );

  const renderHeroTree = () => {
    const heroGridDimensions = getMaxAndMinColumnAndRow(heroTalents);
    const { grid: heroGrid, connections: heroConnections } = buildGrid(
      heroGridDimensions,
      heroTalents
    );

    const heroClassName = heroTalents[0].heroClassName;

    return (
      <HeroClassWrapper>
        <Tooltip
          title={<Typography variant="body1">{heroClassName}</Typography>}
        >
          <HeroClassImage
            src={getHeroTreeIcon(currentClass.name, heroClassName)}
            alt={heroClassName}
          />
        </Tooltip>
        <Tree
          grid={heroGrid}
          connections={heroConnections}
          dimensions={heroGridDimensions}
          currentClass={currentClass}
          currentSpec={currentSpec}
        />
      </HeroClassWrapper>
    );
  };

  return (
    <>
      <ButtonWrapper>
        <Button
          variant="contained"
          onClick={() => {
            rerandomize();
          }}
          startIcon={<Shuffle />}
        >
          Re-randomize Talents
        </Button>
        {/* <Button
          variant="contained"
          onClick={() =>
            exportTalentTree([...classTalents, ...specTalents], currentSpec.id)
          }
          startIcon={<Shuffle />}
        >
          Export Talents
        </Button> */}
      </ButtonWrapper>
      <TalentTreeWrapper talentBackground={currentSpec.talentBackground}>
        <Tree
          grid={classGrid}
          connections={classConnections}
          dimensions={classGridDimensions}
          currentClass={currentClass}
          currentSpec={currentSpec}
        />
        {includeHeroTalents && renderHeroTree()}
        <Tree
          grid={specGrid}
          connections={specConnections}
          dimensions={specGridDimensions}
          currentClass={currentClass}
          currentSpec={currentSpec}
        />
      </TalentTreeWrapper>
    </>
  );
}

export { TalentTree };
