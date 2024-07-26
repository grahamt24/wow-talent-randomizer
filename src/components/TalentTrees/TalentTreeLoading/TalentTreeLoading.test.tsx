import React from "react";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { TalentTreeLoading } from "./TalentTreeLoading";
import { DUMMY_CLASS_GRID, DUMMY_SPEC_GRID } from "./constants";

describe("TalentTreeLoading", () => {
  it("renders the correct number of skeletons", () => {
    render(<TalentTreeLoading />);
    const skeletons = screen.getAllByTestId("skeleton");
    const nonEmptyClass = DUMMY_CLASS_GRID.flat().filter((val) => val !== 0);
    const nonEmptySpec = DUMMY_SPEC_GRID.flat().filter(val => val !== 0)
    expect(skeletons.length).toEqual(nonEmptyClass.length + nonEmptySpec.length);
  });

  it("renders the correct number of empty divs", () => {
    render(<TalentTreeLoading />);
    const skeletons = screen.getAllByTestId("empty");
    const emptyClass = DUMMY_CLASS_GRID.flat().filter((val) => val === 0);
    const emptySpec = DUMMY_SPEC_GRID.flat().filter(val => val === 0)
    expect(skeletons.length).toEqual(emptyClass.length + emptySpec.length);
  });
});