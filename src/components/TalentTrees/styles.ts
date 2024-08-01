import styled from "@emotion/styled";
import { Alert } from "@mui/material";
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
  display: flex;
  gap: 12px;
  padding: 0 24px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;
`;

const AlertWrapper = styled.div`
  flex: 3;
  margin: auto;
`;

const StyledAlert = styled(Alert)`
  padding: 12px 32px;
`;

const HeroClassImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 85%;
`;

const HeroClassWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  padding: 24px 0;
`;

export {
  TalentTreeWrapper,
  ButtonWrapper,
  AlertWrapper,
  StyledAlert,
  HeroClassImage,
  HeroClassWrapper,
};
