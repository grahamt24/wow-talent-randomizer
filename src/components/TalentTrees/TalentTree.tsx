import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { useFetchTalents } from "../../api/hooks/useFetchTalents";
import { Arrow } from "./Arrow/Arrow";
import { Button } from "@mui/material";
import Shuffle from "@mui/icons-material/Shuffle";
import { useClassAndSpec } from "../../context/ClassAndSpec/useClassAndSpec";
import { useTalentWeight } from "../../context/TalentWeight/useTalentWeight";
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

function TalentTree() {
  const { currentClass, currentSpec } = useClassAndSpec();
  const { talentWeight } = useTalentWeight();
  const { classTalents, specTalents, rerandomize } = useFetchTalents(
    currentClass?.id,
    currentSpec?.id,
    talentWeight
  );

  const [cellDimensions, setCellDimensions] = useState({ width: 0, height: 0 });
  const measureRef = (node: HTMLDivElement) => {
    if (
      node !== null &&
      cellDimensions.width === 0 &&
      cellDimensions.height === 0
    ) {
      const { offsetWidth, offsetHeight } = node;
      setCellDimensions({ width: offsetWidth, height: offsetHeight });
    }
  };

  useEffect(() => {
    setCellDimensions({ width: 0, height: 0 });
  }, [currentClass, currentSpec]);

  if (!currentClass || !currentSpec) {
    return (
      <AlertWrapper>
        <StyledAlert severity="info">
          Please choose a specialization above to randomize!
        </StyledAlert>
      </AlertWrapper>
    );
  }

  if (classTalents.length === 0 || specTalents.length === 0) {
    return <TalentTreeLoading />;
  }

  const maxColAndRow = getMaxColumnAndRow([classTalents, specTalents]);
  const { grid, connections } = buildGrid(
    maxColAndRow.maxRow,
    maxColAndRow.maxColumn,
    [classTalents, specTalents]
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
