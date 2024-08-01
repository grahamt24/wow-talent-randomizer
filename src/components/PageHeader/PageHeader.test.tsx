import React from "react";
import { render, screen } from "@testing-library/react";
import { PageHeader } from "./PageHeader";
import { CLASSES } from "../../api/WorldOfWarcraftClasses/constants";
import { TalentWeightContextProvider } from "../../context/TalentTreeOptions/TalentTreeOptionsContext";
import { ClassAndSpecContextProvider } from "../../context/ClassAndSpec/ClassAndSpecContext";

describe("PageHeader", () => {
  it("renders TalentWeightSelect and ClassSelect components", () => {
    render(<PageHeader />, {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <TalentWeightContextProvider>
          <ClassAndSpecContextProvider>{children}</ClassAndSpecContextProvider>
        </TalentWeightContextProvider>
      ),
    });

    expect(
      screen.getByRole("radio", { name: /Exponential/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("radio", { name: /Flat/i })
    ).toBeInTheDocument();

    CLASSES.forEach((c) => {
      expect(screen.getByRole("button", { name: c.name })).toBeInTheDocument();
    });
  });
});
