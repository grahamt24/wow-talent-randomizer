import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { ButtonBase, Tooltip, Typography } from "@mui/material";
import { TalentNode } from "./TalentNode";

interface NodeProps {
  node: TalentNode;
  className: string;
  specName: string;
}

interface NodeButtonProps {
  nodeImage: string;
  passive?: boolean;
  maxRank?: boolean;
}

const MissingPointsButton = styled(ButtonBase, {
  shouldForwardProp: (propName) =>
    propName !== "nodeImage" && propName !== "passive",
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
    z-index: 2;
  }
`;

const SelectedTalentButton = styled(ButtonBase, {
  shouldForwardProp: (propName) =>
    propName !== "nodeImage" && propName !== "passive" && propName !== "maxRank",
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
    border: ${({ maxRank }) => (maxRank ? "2px solid gold" : "2px solid green")};
    z-index: 2;
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

function NodeTooltipDescription(props: DescriptionProps) {
  return (
    <>
      <Typography variant="body1">{props.name}</Typography>
      <Typography variant="caption">{props.description}</Typography>
    </>
  );
}

async function getNodeImage(
  className: string,
  specName: string,
  spellId: string,
  isClassTalent: boolean
): Promise<string> {
  const image = await import(
    `../../assets/${className}/talents/${isClassTalent ? "class" : `${specName}`}/${spellId}.jpg`
  );
  return image.default;
}

export function Node(props: NodeProps) {
  const [nodeImage, setNodeImage] = useState<string>("");

  useEffect(() => {
    getNodeImage(props.className, props.specName, props.node.spellId.toString(), props.node.isClassTalent)
      .then(setNodeImage)
      .catch((error) => console.error("Error loading image:", error));
  }, [props.className, props.specName, props.node.spellId]);

  if (props.node.rank === 0) {
    return (
      <Tooltip title={<NodeTooltipDescription name={props.node.name} description={props.node.description} />} placement="top" arrow>
        <MissingPointsButton id={props.node.id.toString()} nodeImage={nodeImage} passive={props.node.type === "passive"}>
          <NotMaxRankPointsSpan>
            {props.node.rank} / {props.node.totalRanks}
          </NotMaxRankPointsSpan>
        </MissingPointsButton>
      </Tooltip>
    );
  }

  return (
    <Tooltip
      title={
        <NodeTooltipDescription
          name={props.node.name}
          description={props.node.description}
        />
      }
      placement="top"
      arrow
    >
      <SelectedTalentButton
        id={props.node.id.toString()}
        nodeImage={nodeImage}
        passive={props.node.type === "passive"}
        maxRank={props.node.rank === props.node.totalRanks}
      >
        <MaxRankPointsSpan>
          {props.node.rank} / {props.node.totalRanks}
        </MaxRankPointsSpan>
      </SelectedTalentButton>
    </Tooltip>
  );
}
