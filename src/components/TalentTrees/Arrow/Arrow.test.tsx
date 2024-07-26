import React from "react";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { Arrow } from "./Arrow";
import { TalentNode } from "../../../api/BlizzardAPI/types";

describe("Arrow Component", () => {
  it("renders correctly with given props", () => {
    const from = { column: 1, row: 1, rank: 1 } as TalentNode;
    const to = { column: 2, row: 2, rank: 1 } as TalentNode;
    const gridCellHeight = 50;
    const gridCellWidth = 50;

    render(
      <Arrow
        from={from}
        to={to}
        gridCellHeight={gridCellHeight}
        gridCellWidth={gridCellWidth}
      />
    );

    expect(screen.getByTestId("arrow")).toBeInTheDocument();
    expect(screen.getByTestId("arrow-line").getAttribute("stroke")).toBe("yellow");
  });

  it("renders with white stroke when ranks are zero", () => {
    const from = { column: 1, row: 1, rank: 0 } as TalentNode;
    const to = { column: 2, row: 2, rank: 0 } as TalentNode;
    const gridCellHeight = 50;
    const gridCellWidth = 50;

    render(
      <Arrow
        from={from}
        to={to}
        gridCellHeight={gridCellHeight}
        gridCellWidth={gridCellWidth}
      />
    );

    expect(screen.getByTestId("arrow-line").getAttribute("stroke")).toBe("white");
  });
});
