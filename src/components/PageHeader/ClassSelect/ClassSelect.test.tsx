import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ClassSelect } from "./ClassSelect";
import { useClassAndSpec } from "../../../context/ClassAndSpec/useClassAndSpec";
import { mocked } from "jest-mock";
import { CLASSES } from "../../../api/WorldOfWarcraftClasses/constants";

jest.mock("../../../context/ClassAndSpec/useClassAndSpec");
const mockUseClassAndSpec = mocked(useClassAndSpec);

describe("ClassSelect", () => {
  const mockSetCurrentClass = jest.fn();
  const mockSetCurrentSpec = jest.fn();

  beforeEach(() => {
    mockUseClassAndSpec.mockReturnValue({
      setCurrentClass: mockSetCurrentClass,
      setCurrentSpec: mockSetCurrentSpec,
      currentClass: undefined,
      currentSpec: undefined,
    });
  });

  it("renders correctly and opens menu on button click", async () => {
    const user = userEvent.setup();
    render(<ClassSelect class={CLASSES[0]} />);

    const button = screen.getByRole("button", { name: /Death Knight/i });
    expect(button).toBeInTheDocument();

    await user.click(button);
    expect(
      screen.getByRole("menuitem", { name: /Blood/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("menuitem", { name: /Frost/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("menuitem", { name: /Unholy/i })
    ).toBeInTheDocument();
  });

  it("calls setCurrentClass and setCurrentSpec on specialization selection", async () => {
    const user = userEvent.setup();
    render(<ClassSelect class={CLASSES[0]} />);

    await user.click(screen.getByRole("button", { name: /Death Knight/i }));
    await user.click(screen.getByRole("menuitem", { name: /Frost/i }));

    expect(mockSetCurrentClass).toHaveBeenCalledWith(CLASSES[0]);
    expect(mockSetCurrentSpec).toHaveBeenCalledWith(CLASSES[0].specs[1]);
  });

  it("displays class name in a tooltip on hover", async () => {
    const user = userEvent.setup();
    render(<ClassSelect class={CLASSES[0]} />);

    await user.hover(screen.getByRole("button", { name: /Death Knight/i }));

    const tooltip = await screen.findByRole("tooltip");

    expect(tooltip).toHaveTextContent(CLASSES[0].name);
  });
});
