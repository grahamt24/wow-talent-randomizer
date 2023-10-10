import React from "react";
import styled from "@emotion/styled";
import Grid from "@mui/material/Unstable_Grid2";
import Skeleton from "@mui/material/Skeleton/Skeleton";

const TalentTreeWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  flex: 3;
`;

const TalentGrid = styled(Grid)`
  width: 100%;
`;

const DUMMY_CLASS_GRID = [
  [0, 0, 0, 2, 0, 0, 0],
  [0, 0, 1, 0, 1, 0, 0],
  [0, 0, 1, 0, 1, 0, 0],
  [0, 1, 0, 1, 0, 1, 0],
  [1, 2, 1, 2, 1, 2 ,1],
  [0, 1, 0, 1, 0, 1, 0],
  [1, 0, 0, 1, 0, 1, 1],
  [1, 0, 0, 1, 0, 1, 2],
  [2, 0, 1, 0, 1, 0, 1]
];

const DUMMY_SPEC_GRID = [
  [0, 2, 0, 0, 0, 2, 0],
  [1, 0, 1, 0, 0, 1, 0],
  [2, 0, 2, 0, 2, 1, 1],
  [0, 1, 0, 1, 0, 1, 0],
  [1, 2, 1, 0, 1, 2 ,1],
  [0, 1, 0, 1, 0, 1, 0],
  [0, 2, 0, 1, 0, 2, 0],
  [1, 0, 1, 0, 1, 0, 1],
  [0, 2, 0, 0, 2, 0, 2]
]


export function TalentTreeSkeleton() {
  return (
    <TalentTreeWrapper>
      <TalentGrid xs={6} container columns={7}>
      {
          DUMMY_CLASS_GRID.map((row) => {
            return row.map((col, ind) => {
              if (col === 0) {
                return (
                  <Grid key={`class_${col}${ind}`} xs={1}>
                    <div></div>
                  </Grid>
                )
              }
              return (
                <Grid key={`class_${col}${ind}`} xs={1}>
                  <Skeleton width={50} height={50} variant={col === 2 ? "rounded" : "circular"} />
                </Grid>
              )
            });
          })
        }
      </TalentGrid>
      <TalentGrid xs={6} container columns={7}>
      {
          DUMMY_SPEC_GRID.map((row) => {
            return row.map((col, ind) => {
              if (col === 0) {
                return (
                  <Grid key={`class_${col}${ind}`} xs={1}>
                    <div></div>
                  </Grid>
                )
              }
              return (
                <Grid key={`class_${col}${ind}`} xs={1}>
                  <Skeleton width={50} height={50} variant={col === 2 ? "rounded" : "circular"} />
                </Grid>
              )
            });
          })
        }
      </TalentGrid>
    </TalentTreeWrapper>
  )
}