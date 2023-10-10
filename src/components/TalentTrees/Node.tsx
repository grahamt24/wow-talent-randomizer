import React from "react";
import styled from "@emotion/styled";
import { ButtonBase, Tooltip, Typography } from "@mui/material";
import { TalentNode } from "./TalentNode";

interface NodeProps {
  node: TalentNode;
}

interface NodeButtonProps {
  nodeImage: string;
  passive?: boolean;
}

const MissingPointsButton = styled(ButtonBase, {
  shouldForwardProp: (propName) => propName !== "nodeImage" && propName !== "passive",
})<NodeButtonProps>`
  && {
    background-image: url(${(props) => props.nodeImage});
    background-repeat: no-repeat;
    background-size: 50px;
    height: 50px;
    width: 50px;
    ${({ passive }) => (passive ? "border-radius: 50%" : "")};
    justify-content: flex-end;
    align-items: flex-end;
    filter: grayscale(1);
    border: 3px solid gray;
  }
`;

const SelectedTalentButton = styled(ButtonBase, {
  shouldForwardProp: (propName) => propName !== "nodeImage" && propName !== "passive",
})<NodeButtonProps>`
  && {
    background-image: url(${(props) => props.nodeImage});
    background-repeat: no-repeat;
    background-size: 50px;
    height: 50px;
    width: 50px;
    ${({ passive }) => (passive ? "border-radius: 50%" : "")};
    justify-content: flex-end;
    align-items: flex-end;
    border: 2px solid gold;
  }
`;

const NotMaxRankPointsSpan = styled.span`
  font-size: 10px;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  background-color: black;
  color: white;
  padding: 2px;
`;

const MaxRankPointsSpan = styled.span`
  font-size: 10px;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  background-color: black;
  color: white;
  padding: 2px;
`;

interface DescriptionProps {
  name: string;
  description: string;
}

function NodeTooltipDescription(props: DescriptionProps){
  return (
    <>
      <Typography variant="body1">{props.name}</Typography>
      <Typography variant="caption">{props.description}</Typography>
    </>
  )
}

export function Node(props: NodeProps) {
  if (props.node.rank === 0) {
    return (
      <Tooltip title={<NodeTooltipDescription name={props.node.name} description={props.node.description} />} placement="top" arrow>
        <MissingPointsButton id={props.node.id.toString()} nodeImage={props.node.image} passive={props.node.type === "passive"}>
          <NotMaxRankPointsSpan>
            {props.node.rank} / {props.node.totalRanks}
          </NotMaxRankPointsSpan>
        </MissingPointsButton>
      </Tooltip>
    );
  }

  return (
    <Tooltip title={<NodeTooltipDescription name={props.node.name} description={props.node.description} />} placement="top" arrow>
      <SelectedTalentButton id={props.node.id.toString()} nodeImage={props.node.image} passive={props.node.type === "passive"}>
        <MaxRankPointsSpan>
          {props.node.rank} / {props.node.totalRanks}
        </MaxRankPointsSpan>
      </SelectedTalentButton>
    </Tooltip>
  );
}
