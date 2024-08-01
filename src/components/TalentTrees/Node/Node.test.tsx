import React from "react";
import { render } from "@testing-library/react";
import { screen, within } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { TalentNode } from "../../../api/BlizzardAPI/types";
import { getNodeImage } from "./utils";
import { Node } from "./Node";
import { MOCK_TALENT_NODE } from "../../../testing/talentNodeMockData";

jest.mock("./utils");
jest.mocked(getNodeImage).mockReturnValue("fakeImage.jpg");

describe("Node", () => {
  it("renders the missing points button when the node's rank is 0", () => {
    const MISSING_POINTS_NODE: TalentNode = {
      ...MOCK_TALENT_NODE,
      rank: 0,
    };
    render(
      <Node node={MISSING_POINTS_NODE} className="Class" specName="spec" />
    );

    expect(screen.getByRole("button", { name: /0 \/ 1/i })).toBeInTheDocument();
  });

  it("renders the selected talent button when the node's rank is greater than 0", () => {
    render(<Node node={MOCK_TALENT_NODE} className="Class" specName="spec" />);

    expect(screen.getByRole("button", { name: /1 \/ 1/i })).toBeInTheDocument();
  });

  it("does not render the points span if the node is a default node", () => {
    const DEFAULT_NODE = {
      ...MOCK_TALENT_NODE,
      isDefaultNode: true,
    };
    render(<Node node={DEFAULT_NODE} className="Class" specName="spec" />);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("renders the tooltip when hovering over the button", async () => {
    const user = userEvent.setup();
    render(<Node node={MOCK_TALENT_NODE} className="Class" specName="spec" />);

    await user.hover(screen.getByRole("button", { name: /1 \/ 1/i }));

    const tooltip = await screen.findByRole("tooltip");

    expect(
      within(tooltip).getByText(MOCK_TALENT_NODE.name)
    ).toBeInTheDocument();
    expect(
      within(tooltip).getByText(MOCK_TALENT_NODE.description)
    ).toBeInTheDocument();
  });
});
