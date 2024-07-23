import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ClassList } from "./components/ClassList";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { TalentTree } from "./components/TalentTrees/TalentTree";
import styled from "@emotion/styled";
import { ClassAndSpecContextProvider } from "./components/ClassAndSpecContext/ClassAndSpecContext";
import { TalentWeightContextProvider } from "./components/TalentWeightContext";
import { TalentTreesProvider } from "./api/talentTrees";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const AppWrapper = styled.div`
  padding: 60px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  row-gap: 20px;
  flex-wrap: wrap;
  height: 100%;
  position: relative;
`;

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <QueryClientProvider client={queryClient}>
        <TalentTreesProvider>
          <ClassAndSpecContextProvider>
            <TalentWeightContextProvider>
              <CssBaseline />
              <AppWrapper>
                <ClassList />
                <TalentTree />
              </AppWrapper>
            </TalentWeightContextProvider>
          </ClassAndSpecContextProvider>
        </TalentTreesProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
