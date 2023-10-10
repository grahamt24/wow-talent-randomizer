import React, { useMemo } from "react";
import styled from "@emotion/styled";
import Grid from "@mui/material/Unstable_Grid2";
import { Node } from "./Node";
import { TalentNode } from "./TalentNode";
import { useClassAndSpec } from "../ClassAndSpecContext/ClassAndSpecContext";
import { fetchTalentRandomizer } from "../../api/TalentRandomizer";
import { useQuery } from "@tanstack/react-query";
import Alert from "@mui/material/Alert";
import { buildPointsAvailable } from "../../api/totalPointsAvailable";
import { useTalentWeight } from "../TalentWeightContext";
import { TalentTreeSkeleton } from "./TalentTreeSkeleton";

interface TalentTreeWrapperProps {
  talentBackground?: string;
}

const TalentTreeWrapper = styled("div", {
  shouldForwardProp: (propName) => propName !== "talentBackground",
})<TalentTreeWrapperProps>`
  width: 100%;
  flex: 3;
  background: url(${(props) => props.talentBackground}) no-repeat;
  background-size: 100% 100%;
`;

const TalentGrid = styled(Grid)`
  width: 100%;
  height: 100%;
`;

const AlertWrapper = styled.div`
  flex: 3;
  margin: auto;
`

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

function buildGrid(
  maxRow: number,
  maxColumn: number,
  data: [TalentNode[], TalentNode[]]
): Array<Array<number | TalentNode>> {
  const grid = [...Array(maxRow)].map((e) => Array(maxColumn).fill(0));
  data[0].forEach((node) => {
    grid[node.row-1][node.column-1] = node;
  });
  data[1].forEach((node) => {
    grid[node.row-1][node.column-1] = node;
  });
  return grid;
}

// function buildArrowsFromGrid(grid: Array<Array<number | TalentNode>>) {
//   console.log(grid);
// }

export function TalentTree() {
  const { currentClass, currentSpec, classLevel } = useClassAndSpec();
  const { talentWeight } = useTalentWeight();
  const pointsAvailable = useMemo(() => buildPointsAvailable(), []);
  const { data, isFetching } = useQuery(
    ["talentRandomizer", currentClass?.name, currentSpec?.name, talentWeight, classLevel],
    () => fetchTalentRandomizer(currentClass?.name, currentSpec?.name, pointsAvailable[classLevel].classPoints, pointsAvailable[classLevel].specPoints, talentWeight),
    {
      enabled: !!currentClass && !!currentSpec,
    }
  );
  if (isFetching) {
    return (
      <TalentTreeSkeleton />
    )
  }
  if (!data) {
    return (
      <AlertWrapper>
        <StyledAlert severity="info">Please choose a specialization above to randomize!</StyledAlert>
      </AlertWrapper>
    )
  }
  const maxColAndRow = getMaxColumnAndRow([data.classTalents, data.specTalents]);
  const talentsGrid = buildGrid(maxColAndRow.maxRow, maxColAndRow.maxColumn, [data.classTalents, data.specTalents]);
  // buildArrowsFromGrid(talentsGrid);
  return (
    <TalentTreeWrapper talentBackground={currentSpec?.talentBackground}>
      <TalentGrid container columns={maxColAndRow.maxColumn}>
        {
          talentsGrid.map((row) => {
            return row.map((col, ind) => {
              if (typeof col === "number") {
                return (
                  <Grid display="flex" justifyContent="center" alignItems="center" key={`class_${col}${ind}`} xs={1}>
                    <div></div>
                  </Grid>
                )
              }
              return (
                <Grid display="flex" justifyContent="center" alignItems="center" key={`class_${col.id}`} xs={1}>
                  <Node node={col} />
                </Grid>
              )
            });
          })
        }
      </TalentGrid>
    </TalentTreeWrapper>
  );
}
