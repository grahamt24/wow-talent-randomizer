import React from "react";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { NodeTooltip } from "./NodeTooltip";

describe("NodeTooltip", () => {
  it("should render provided talent name and description", () => {
    render(
      <NodeTooltip name="Tooltip name" description="Tooltip description" />
    );

    expect(screen.getByText("Tooltip name")).toBeInTheDocument();
    expect(screen.getByText("Tooltip description")).toBeInTheDocument();
  });
});
