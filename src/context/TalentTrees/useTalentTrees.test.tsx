import React from "react";
import { renderHook } from "@testing-library/react";
import { useTalentTrees } from "./useTalentTrees";
import { TalentTreesProvider } from "./TalentTrees";
import { TalentTreesContextType } from "./types";

describe("useTalentTrees", () => {
  it("should throw an error if used outside of TalentTreesProvider", () => {
    expect(() => {
      renderHook(() => useTalentTrees());
    }).toThrow("useTalentTrees must be used within a TalentTreesProvider");
  });

  it("should return context value when used within TalentTreesProvider", () => {
    const mockValue: TalentTreesContextType = {
      talentTrees: {
        1: {
          1: {
            id: 1,
            class_talent_nodes: [],
            spec_talent_nodes: [],
            restriction_lines: [],
            playable_class: {
              id: 1,
              name: "Death Knight",
            },
            playable_specialization: {
              id: 1,
              name: "Blood",
            },
          },
        },
      },
    };
    jest
      .spyOn(Storage.prototype, "getItem")
      .mockReturnValue(JSON.stringify(mockValue.talentTrees));

    const { result } = renderHook(() => useTalentTrees(), {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <TalentTreesProvider>{children}</TalentTreesProvider>
      ),
    });
    expect(result.current).toEqual(mockValue);

    jest.spyOn(Storage.prototype, "getItem").mockRestore();
  });
});
