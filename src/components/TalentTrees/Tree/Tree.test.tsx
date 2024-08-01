import React from "react";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { Tree } from "./Tree";
import { TreeProps } from "./types";

jest.mock("react-xarrows", () => {
  return jest.fn(() => <div data-testid="mock-xarrow" />);
});

describe("Tree Component", () => {
  const mockProps = {
    dimensions: { minColumn: 0, maxColumn: 3, minRow: 0, maxRow: 3 },
    grid: [
      [0, { id: 1, name: "Node 1", rank: 1, spellId: 1 }, 2],
      [3, { id: 4, name: "Node 2", rank: 0, spellId: 2 }, 5],
    ],
    connections: [
      {
        from: { id: 1, name: "Node 1", rank: 1 },
        to: { id: 4, name: "Node 2", rank: 0 },
      },
    ],
    currentClass: { name: "Warrior" },
    currentSpec: { name: "Arms" },
  } as TreeProps;

  it("renders the correct number of grid items", () => {
    render(<Tree {...mockProps} />);
    const talentNodes = screen.getAllByRole("button");
    expect(talentNodes.length).toBe(2);
  });

  it("renders connections correctly", () => {
    render(<Tree {...mockProps} />);
    const arrow = screen.getAllByTestId("mock-xarrow");
    expect(arrow).toHaveLength(1);
  });
});
