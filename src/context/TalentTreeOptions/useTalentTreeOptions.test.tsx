import React from "react";
import { renderHook } from "@testing-library/react";
import { useTalentTreeOptions } from "./useTalentTreeOptions";
import { TalentTreeOptionsContextType } from "./types";
import { TalentWeightContextProvider } from "./TalentTreeOptionsContext";

describe("useTalentTreeOptions", () => {
  it("should throw an error if used outside of TalentWeightProvider", () => {
    expect(() => {
      renderHook(() => useTalentTreeOptions());
    }).toThrow("useTalentTreeOptions must be used within a TalentTreeOptionsProvider");
  });

  it("should return context value when used within TalentTreeOptionsProvider", () => {
    const mockValue: TalentTreeOptionsContextType = {
      talentWeight: "exponential",
      setTalentWeight: expect.any(Function),
      includeHeroTalents: true,
      setIncludeHeroTalents: expect.any(Function),
    };
    const { result } = renderHook(() => useTalentTreeOptions(), {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <TalentWeightContextProvider>{children}</TalentWeightContextProvider>
      ),
    });
    expect(result.current).toEqual(mockValue);
  });
});
