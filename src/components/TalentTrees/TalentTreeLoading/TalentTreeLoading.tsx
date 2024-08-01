import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Skeleton } from "@mui/material";
import { TalentTreeWrapper, TalentGrid } from "./styles";
import { DUMMY_CLASS_GRID, DUMMY_SPEC_GRID } from "./constants";

function TalentTreeLoading() {
  return (
    <TalentTreeWrapper>
      <TalentGrid xs={6} container columns={7}>
        {DUMMY_CLASS_GRID.map((row) => {
          return row.map((col, ind) => {
            if (col === 0) {
              return (
                <Grid key={`class_${col}${ind}`} xs={1}>
                  <div data-testid="empty"></div>
                </Grid>
              );
            }
            return (
              <Grid key={`class_${col}${ind}`} xs={1}>
                <Skeleton
                  width={50}
                  height={50}
                  variant={col === 2 ? "rounded" : "circular"}
                  data-testid="skeleton"
                />
              </Grid>
            );
          });
        })}
      </TalentGrid>
      <TalentGrid xs={6} container columns={7}>
        {DUMMY_SPEC_GRID.map((row) => {
          return row.map((col, ind) => {
            if (col === 0) {
              return (
                <Grid key={`class_${col}${ind}`} xs={1}>
                  <div data-testid="empty"></div>
                </Grid>
              );
            }
            return (
              <Grid key={`class_${col}${ind}`} xs={1}>
                <Skeleton
                  width={50}
                  height={50}
                  variant={col === 2 ? "rounded" : "circular"}
                  data-testid="skeleton"
                />
              </Grid>
            );
          });
        })}
      </TalentGrid>
    </TalentTreeWrapper>
  );
}

export { TalentTreeLoading };
