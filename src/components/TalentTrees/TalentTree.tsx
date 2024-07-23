import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Grid from "@mui/material/Unstable_Grid2";
import { Node } from "./Node";
import { TalentNode } from "./TalentNode";
import { useClassAndSpec } from "../ClassAndSpecContext/ClassAndSpecContext";
import { useFetchTalents } from "../../api/useFetchTalents";
import Alert from "@mui/material/Alert";
import { useTalentWeight } from "../TalentWeightContext";
import { TalentTreeSkeleton } from "./TalentTreeSkeleton";
import { Connections } from "../../api/convertResponseData";
import { Arrow } from "./Arrow";
import { Button } from "@mui/material";
import Shuffle from "@mui/icons-material/Shuffle";
import IosShareIcon from "@mui/icons-material/IosShare";
import { exportTalentTree } from "../../api/exportTalentTree";

interface TalentTreeWrapperProps {
  talentBackground?: string;
}

const TalentTreeWrapper = styled("div", {
  shouldForwardProp: (propName) => propName !== "talentBackground",
})<TalentTreeWrapperProps>`
  width: 95%;
  align-self: center;
  flex: 3;
  background: url(${(props) => props.talentBackground}) no-repeat;
  background-size: 100% 100%;
  position: relative;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;
`;

const TalentGrid = styled(Grid)`
  width: 100%;
  height: 100%;
`;

const AlertWrapper = styled.div`
  flex: 3;
  margin: auto;
`;

const StyledAlert = styled(Alert)`
  padding: 12px 32px;
`;

function getMaxColumnAndRow(data: [TalentNode[], TalentNode[]]) {
  let maxColumn = -Infinity;
  let maxRow = -Infinity;
  data[0].forEach((node) => {
    if (node.column > maxColumn) {
      maxColumn = node.column;
    }
    if (node.row > maxRow) {
      maxRow = node.row;
    }
  });
  data[1].forEach((node) => {
    if (node.column > maxColumn) {
      maxColumn = node.column;
    }
    if (node.row > maxRow) {
      maxRow = node.row;
    }
  });

  return {
    maxRow,
    maxColumn,
  };
}

interface GridAndConnections {
  grid: Array<Array<number | TalentNode>>;
  connections: Connections[];
}

function buildGrid(
  maxRow: number,
  maxColumn: number,
  data: [TalentNode[], TalentNode[]]
): GridAndConnections {
  const grid = [...Array(maxRow)].map((e) => Array(maxColumn).fill(0));
  const connections: Connections[] = [];

  data[0].forEach((node) => {
    grid[node.row - 1][node.column - 1] = node;
    node.unlocks.forEach((unlockId) => {
      const childNode =
        data[0].find((n) => n.id === unlockId) ||
        data[1].find((n) => n.id === unlockId);
      if (childNode) {
        connections.push({ from: node, to: childNode });
      }
    });
  });

  data[1].forEach((node) => {
    grid[node.row - 1][node.column - 1] = node;
    node.unlocks.forEach((unlockId) => {
      const childNode =
        data[0].find((n) => n.id === unlockId) ||
        data[1].find((n) => n.id === unlockId);
      if (childNode) {
        connections.push({ from: node, to: childNode });
      }
    });
  });

  return { grid, connections };
}

export function TalentTree() {
  const { currentClass, currentSpec } = useClassAndSpec();
  const { talentWeight } = useTalentWeight();
  const { classTalents, specTalents } = useFetchTalents(currentClass?.id, currentSpec?.id, talentWeight);

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
    return <TalentTreeSkeleton />;
  }

  const maxColAndRow = getMaxColumnAndRow([
    classTalents,
    specTalents,
  ]);
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
          // onClick={() => refetch()}
          startIcon={<Shuffle />}
        >
          Re-randomize Talents
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            exportTalentTree(
              [...classTalents, ...specTalents],
              currentSpec.id
            )
          }
          startIcon={<IosShareIcon />}
        >
          Export Talents
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
