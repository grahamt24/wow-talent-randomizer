import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mocked } from "jest-mock";
import { TalentWeightSelect } from "./TalentWeightSelect";
import { TalentWeightContextProvider } from "../../../context/TalentWeight/TalentWeightContext";
import { useTalentWeight } from "../../../context/TalentWeight/useTalentWeight";
import { TalentWeightContextType } from "../../../context/TalentWeight/types";

jest.mock("../../../context/TalentWeight/useTalentWeight");
const mockUseTalentWeight = mocked(useTalentWeight);

const MOCK_USE_TALENT_RETURN: TalentWeightContextType = {
  talentWeight: "exponential",
  setTalentWeight: jest.fn(),
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
    mockUseTalentWeight.mockReturnValue(MOCK_USE_TALENT_RETURN);
  });

  it("renders the select component", () => {
    renderWithProvider();
    expect(
      screen.getByRole("combobox", { name: /Talent Weight/i })
    ).toBeInTheDocument();
  });

  it("changes talent weight on selection", async () => {
    const user = userEvent.setup();
    renderWithProvider();

    await user.click(screen.getByRole("combobox", { name: /Talent Weight/i }));
    await user.click(screen.getByRole("option", { name: /flat/i }));

    expect(MOCK_USE_TALENT_RETURN.setTalentWeight).toHaveBeenCalledWith("flat");
  });
});
