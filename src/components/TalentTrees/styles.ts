import styled from "@emotion/styled";
import { Alert } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { TalentTreeWrapperProps } from "./types";

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

export {
  TalentTreeWrapper,
  ButtonWrapper,
  TalentGrid,
  AlertWrapper,
  StyledAlert,
};
