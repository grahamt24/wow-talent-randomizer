import React from "react";
import { Typography } from "@mui/material";
import { NodeTooltipProps } from "./types";

function NodeTooltip(props: NodeTooltipProps) {
  return (
    <>
      <Typography variant="body1">{props.name}</Typography>
      <Typography variant="caption">{props.description}</Typography>
    </>
  );
}

export { NodeTooltip };
