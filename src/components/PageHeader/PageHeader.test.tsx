import React from "react";
import { render, screen } from "@testing-library/react";
import { PageHeader } from "./PageHeader";
import { CLASSES } from "../../api/WorldOfWarcraftClasses/constants";

describe("PageHeader", () => {
  it("renders TalentWeightSelect and ClassSelect components", () => {
    render(<PageHeader />);

    expect(
      screen.getByRole("combobox", { name: /Talent Weight/i })
    ).toBeInTheDocument();

    CLASSES.forEach((c) => {
      expect(screen.getByRole("button", { name: c.name })).toBeInTheDocument();
    });
  });
});
