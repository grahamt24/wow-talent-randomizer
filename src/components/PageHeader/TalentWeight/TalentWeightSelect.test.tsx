import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mocked } from "jest-mock";
import { TalentWeightSelect } from "./TalentWeightSelect";
import { TalentWeightContextProvider } from "../../../context/TalentTreeOptions/TalentTreeOptionsContext";
import { useTalentTreeOptions } from "../../../context/TalentTreeOptions/useTalentTreeOptions";
import { TalentTreeOptionsContextType } from "../../../context/TalentTreeOptions/types";

jest.mock("../../../context/TalentTreeOptions/useTalentTreeOptions");
const mockUseTalentTreeOptions = mocked(useTalentTreeOptions);

const MOCK_USE_TALENT_TREE_OPTIONS_RETURN: TalentTreeOptionsContextType = {
  talentWeight: "exponential",
  setTalentWeight: jest.fn(),
  includeHeroTalents: false,
  setIncludeHeroTalents: jest.fn(),
};

describe("TalentWeightSelect", () => {
  const renderWithProvider = () => {
    return render(
      <TalentWeightContextProvider>
        <TalentWeightSelect />
      </TalentWeightContextProvider>
    );
  };

  beforeEach(() => {
    mockUseTalentTreeOptions.mockReturnValue(
      MOCK_USE_TALENT_TREE_OPTIONS_RETURN
    );
  });

  it("renders the radio buttons", () => {
    renderWithProvider();
    expect(
      screen.getByRole("radio", { name: /Exponential/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: /Flat/i })).toBeInTheDocument();
  });

  it("changes talent weight on selection", async () => {
    const user = userEvent.setup();
    renderWithProvider();

    await user.click(screen.getByRole("radio", { name: /Flat/i }));

    expect(
      MOCK_USE_TALENT_TREE_OPTIONS_RETURN.setTalentWeight
    ).toHaveBeenCalledWith("flat");
  });
});
