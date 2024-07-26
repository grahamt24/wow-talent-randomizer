import styled from "@emotion/styled";
import { MenuItem } from "@mui/material";

const SpecImage = styled("img")`
  height: 25px;
  width: 25px;
  border-radius: 50%;
`;

const CustomMenuItem = styled(MenuItem)`
  display: flex;
  column-gap: 8px;
`;

export { SpecImage, CustomMenuItem };
