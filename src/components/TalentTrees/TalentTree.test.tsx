import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mocked } from "jest-mock";
import { TalentTree } from "./TalentTree";
import { useClassAndSpec } from "../../context/ClassAndSpec/useClassAndSpec";
import { useTalentTreeOptions } from "../../context/TalentTreeOptions/useTalentTreeOptions";
import { useFetchTalents } from "../../api/hooks/useFetchTalents";
import { MOCK_TALENT_NODE } from "../../testing/talentNodeMockData";
import { Class } from "../../api/WorldOfWarcraftClasses/types";
import { Specialization } from "../../api/WorldOfWarcraftSpecializations/types";

// Mocking the necessary hooks
jest.mock("../../context/ClassAndSpec/useClassAndSpec");
const useClassAndSpecMock = mocked(useClassAndSpec);

jest.mock("../../context/TalentTreeOptions/useTalentTreeOptions");
const useTalentTreeOptionsMock = mocked(useTalentTreeOptions);

jest.mock("../../api/hooks/useFetchTalents");
const useFetchTalentsMock = mocked(useFetchTalents);

const CLASS: Class = {
  id: 1,
  talentTreeId: 1,
  name: "Warrior",
  image: "warrior.jpg",
  specs: [
    {
      name: "Arms",
      id: 1,
      specIcon: "armsIcon.jpg",
      talentBackground: "armsBackground.jpg",
    },
  ],
};

const SPEC: Specialization = {
  name: "Arms",
  id: 1,
  specIcon: "armsIcon.jpg",
  talentBackground: "armsBackground.jpg",
};

describe("TalentTree Component", () => {
  const mockRerandomize = jest.fn();

  beforeEach(() => {
    useClassAndSpecMock.mockReturnValue({
      currentClass: CLASS,
      currentSpec: SPEC,
      setCurrentClass: jest.fn(),
      setCurrentSpec: jest.fn(),
    });
    useTalentTreeOptionsMock.mockReturnValue({
      talentWeight: "exponential",
      setTalentWeight: jest.fn(),
      includeHeroTalents: false,
      setIncludeHeroTalents: jest.fn(),
    });
    useFetchTalentsMock.mockReturnValue({
      classTalents: [
        { ...MOCK_TALENT_NODE, unlocks: [2] },
        { ...MOCK_TALENT_NODE, id: 2, row: 2, lockedBy: [1] },
      ],
      specTalents: [
        { ...MOCK_TALENT_NODE, id: 3, column: 3, unlocks: [4] },
        { ...MOCK_TALENT_NODE, id: 4, column: 3, row: 2, lockedBy: [3] },
      ],
      heroTalents: [],
      rerandomize: mockRerandomize,
    });
  });

  it("renders the correct amount of talent nodes and connection lines", () => {
    render(<TalentTree />);

    expect(screen.getAllByRole("button", { name: /1 \/ 1/i })).toHaveLength(4);
    expect(screen.getAllByTestId("arrow-line")).toHaveLength(2);
  });

  it("calls rerandomize function when button is clicked", async () => {
    const user = userEvent.setup();
    render(<TalentTree />);

    await user.click(
      screen.getByRole("button", { name: /Re-randomize Talents/i })
    );

    expect(mockRerandomize).toHaveBeenCalled();
  });

  it("displays alert when no class or spec is selected", () => {
    useClassAndSpecMock.mockReturnValue({
      currentClass: undefined,
      currentSpec: undefined,
      setCurrentClass: jest.fn(),
      setCurrentSpec: jest.fn(),
    });
    render(<TalentTree />);

    const alert = screen.getByRole("alert");
    expect(
      within(alert).getByText(
        /Please choose a specialization above to randomize!/i
      )
    ).toBeInTheDocument();
  });

  it("displays loading component when talents are empty", () => {
    useFetchTalentsMock.mockReturnValue({
      classTalents: [],
      specTalents: [],
      heroTalents: [],
      rerandomize: mockRerandomize,
    });
    render(<TalentTree />);

    expect(screen.getAllByTestId("skeleton").length).toBeGreaterThan(0);
  });
});
