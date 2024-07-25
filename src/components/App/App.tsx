import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PageHeader } from "../PageHeader/PageHeader";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { TalentTree } from "../TalentTrees/TalentTree";
import { ClassAndSpecContextProvider } from "../../context/ClassAndSpec/ClassAndSpecContext";
import { TalentWeightContextProvider } from "../../context/TalentWeight/TalentWeightContext";
import { TalentTreesProvider } from "../../context/TalentTrees/TalentTrees";
import { AppWrapper } from "./styles";

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

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <QueryClientProvider client={queryClient}>
        <TalentTreesProvider>
          <ClassAndSpecContextProvider>
            <TalentWeightContextProvider>
              <CssBaseline />
              <AppWrapper>
                <PageHeader />
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
