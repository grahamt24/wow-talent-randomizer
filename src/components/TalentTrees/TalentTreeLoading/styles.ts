import styled from "@emotion/styled";
import Grid from "@mui/material/Unstable_Grid2";

const TalentTreeWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  flex: 3;
`;

const TalentGrid = styled(Grid)`
  width: 100%;
`;

export { TalentTreeWrapper, TalentGrid };
