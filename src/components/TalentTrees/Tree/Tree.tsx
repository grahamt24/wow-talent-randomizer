import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Xarrow from "react-xarrows";
import { TreeProps } from "./types";
import { TalentGrid } from "./styles";
import { Node } from "../Node/Node";

function Tree({
  dimensions,
  grid,
  connections,
  currentClass,
  currentSpec,
}: TreeProps) {
  return (
    <TalentGrid
      container
      columns={dimensions.maxColumn - dimensions.minColumn + 1}
    >
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
      {connections.map(({ from, to }, index) => {
        const fromId = `${from.id}-${from.name}-${
          from.rank === 0 ? "missing-points" : "selected"
        }`;
        const toId = `${to.id}-${to.name}-${
          to.rank === 0 ? "missing-points" : "selected"
        }`;
        const color = to.rank > 0 && from.rank > 0 ? "yellow" : "white";
        return (
          <Xarrow
            start={fromId}
            end={toId}
            key={`${fromId}-${toId}-arrow-${index}`}
            strokeWidth={2}
            path="straight"
            color={color}
            showHead={false}
            data-testid="arrow-line"
          />
        );
      })}
    </TalentGrid>
  );
}

export { Tree };
