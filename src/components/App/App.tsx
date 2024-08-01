import React from "react";
import { PageHeader } from "../PageHeader/PageHeader";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { TalentTree } from "../TalentTrees/TalentTree";
import { ClassAndSpecContextProvider } from "../../context/ClassAndSpec/ClassAndSpecContext";
import { TalentWeightContextProvider } from "../../context/TalentTreeOptions/TalentTreeOptionsContext";
import { TalentTreesProvider } from "../../context/TalentTrees/TalentTrees";
import { AppWrapper } from "./styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
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
    </ThemeProvider>
  );
}

export default App;
