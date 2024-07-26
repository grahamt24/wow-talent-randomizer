import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SpecializationDropdownItem } from "./SpecializationDropdownItem";
import { Specialization } from "../../../../api/WorldOfWarcraftSpecializations/types";

describe("SpecializationDropdownItem", () => {
  const mockOnClick = jest.fn();
  const specialization: Specialization = {
    specIcon: "icon.png",
    name: "Arms",
    id: 1,
    talentBackground: "background.jpg",
  };

  it("renders the image and name", () => {
    render(
      <SpecializationDropdownItem
        onClick={mockOnClick}
        specialization={specialization}
      />
    );
    expect(screen.getByText("Arms")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /Arms icon/i })).toHaveAttribute(
      "src",
      "icon.png"
    );
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    render(
      <SpecializationDropdownItem
        onClick={mockOnClick}
        specialization={specialization}
      />
    );

    await user.click(screen.getByRole("menuitem", { name: /Arms/i }));
    expect(mockOnClick).toHaveBeenCalledWith(specialization);
  });
});
