import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { useFetchTalents } from "../../api/hooks/useFetchTalents";
import { Arrow } from "./Arrow/Arrow";
import { Button } from "@mui/material";
import Shuffle from "@mui/icons-material/Shuffle";
import { useClassAndSpec } from "../../context/ClassAndSpec/useClassAndSpec";
import { useTalentTreeOptions } from "../../context/TalentTreeOptions/useTalentTreeOptions";
import { Node } from "./Node/Node";
import {
  AlertWrapper,
  ButtonWrapper,
  StyledAlert,
  TalentGrid,
  TalentTreeWrapper,
} from "./styles";
import { buildGrid, getMaxColumnAndRow } from "./utils";
import { TalentTreeLoading } from "./TalentTreeLoading/TalentTreeLoading";
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

  const [cellDimensions, setCellDimensions] = useState({ width: 0, height: 0 });
  const measureRef = (node: HTMLDivElement) => {
    if (node !== null) {
      const { offsetWidth, offsetHeight } = node;
      if (
        cellDimensions.width !== offsetWidth ||
        cellDimensions.height !== offsetHeight
      ) {
        setCellDimensions({ width: offsetWidth, height: offsetHeight });
      }
    }
  };

  useEffect(() => {
    if (currentClass && currentSpec) {
      setCellDimensions({ width: 0, height: 0 });
    }
  }, [currentClass, currentSpec]);

  useEffect(() => {
    if (includeHeroTalents) {
      rerandomize();
    }
    setCellDimensions({ width: 0, height: 0 });
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

  const sortedHeroTalents = heroTalents.sort((a, b) => {
    if (a.row === b.row) {
      return a.column - b.column; // Sort by column if rows are equal
    }
    return a.row - b.row; // Sort by row
  });

  const maxColAndRow = getMaxColumnAndRow([classTalents, specTalents]);
  const { grid, connections } = buildGrid(
    maxColAndRow.maxRow,
    maxColAndRow.maxColumn,
    [classTalents, specTalents, sortedHeroTalents]
  );

  return (
    <>
      <ButtonWrapper>
        <Button
          variant="contained"
          onClick={() => rerandomize()}
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
        <TalentGrid container columns={maxColAndRow.maxColumn}>
          {grid.map((row) => {
            return row.map((col, ind) => {
              if (typeof col === "number") {
                return (
                  <Grid
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    key={`class_${col}${ind}`}
                    xs={1}
                  >
                    <div></div>
                  </Grid>
                );
              }
              return (
                <Grid
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  key={`class_${col.id}`}
                  xs={1}
                  ref={measureRef}
                >
                  <Node
                    node={col}
                    className={currentClass.name}
                    specName={currentSpec.name}
                  />
                </Grid>
              );
            });
          })}
          {connections.map((connection, index) => {
            return (
              <Arrow
                key={index}
                from={connection.from}
                to={connection.to}
                gridCellHeight={cellDimensions.height}
                gridCellWidth={cellDimensions.width}
              />
            );
          })}
        </TalentGrid>
      </TalentTreeWrapper>
    </>
  );
}

export { TalentTree };
