import { ButtonBase } from "@mui/material";
import { NodeButtonProps } from "./types";
import styled from "@emotion/styled";

const MissingPointsButton = styled(ButtonBase, {
  shouldForwardProp: (propName) =>
    propName !== "nodeImage" && propName !== "passive",
})<NodeButtonProps>`
  && {
    background-image: url(${(props) => props.nodeImage});
    background-repeat: no-repeat;
    background-size: 40px;
    height: 40px;
    width: 40px;
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
    propName !== "nodeImage" &&
    propName !== "passive" &&
    propName !== "maxRank",
})<NodeButtonProps>`
  && {
    background-image: url(${(props) => props.nodeImage});
    background-repeat: no-repeat;
    background-size: 40px;
    height: 40px;
    width: 40px;
    ${({ passive }) => (passive ? "border-radius: 50%" : "")};
    justify-content: flex-end;
    align-items: flex-end;
    border: ${({ maxRank }) =>
      maxRank ? "2px solid gold" : "2px solid green"};
    z-index: 2;
  }
`;

const NotMaxRankPointsSpan = styled.span`
  font-size: 8px;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  background-color: black;
  color: white;
  padding: 2px;
`;

const MaxRankPointsSpan = styled.span`
  font-size: 8px;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  background-color: black;
  color: white;
  padding: 2px;
`;

export {
  MissingPointsButton,
  SelectedTalentButton,
  NotMaxRankPointsSpan,
  MaxRankPointsSpan,
};
