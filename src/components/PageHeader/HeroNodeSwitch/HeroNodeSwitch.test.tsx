import React from "react";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { mocked } from "jest-mock";
import { HeroNodeSwitch } from "./HeroNodeSwitch";
import { useTalentTreeOptions } from "../../../context/TalentTreeOptions/useTalentTreeOptions";

// Mock the context
jest.mock("../../../context/TalentTreeOptions/useTalentTreeOptions");
const mockUseTalentTreeOptions = mocked(useTalentTreeOptions);

describe("HeroNodeSwitch", () => {
  it("should toggle the switch", async () => {
    const mockSetIncludeHeroTalents = jest.fn();
    mockUseTalentTreeOptions.mockReturnValue({
      talentWeight: "exponential",
      setTalentWeight: jest.fn(),
      includeHeroTalents: false,
      setIncludeHeroTalents: mockSetIncludeHeroTalents
    })
    const user = userEvent.setup();
    render(<HeroNodeSwitch />);
    const switchElement = screen.getByRole("checkbox", { name: /Include Hero Talents?/i });

    expect(switchElement).not.toBeChecked();

    await user.click(switchElement);
    expect(mockSetIncludeHeroTalents).toHaveBeenCalledWith(true);
  });
});