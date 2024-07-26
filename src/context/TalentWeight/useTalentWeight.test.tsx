import React from "react";
import { renderHook } from "@testing-library/react";
import { useTalentWeight } from "./useTalentWeight";
import { TalentWeightContextType } from "./types";
import { TalentWeightContextProvider } from "./TalentWeightContext";

describe("useTalentWeight", () => {
  it("should throw an error if used outside of TalentWeightProvider", () => {
    expect(() => {
      renderHook(() => useTalentWeight());
    }).toThrow("useTalentWeight must be used within a TalentWeightProvider");
  });

  it("should return context value when used within TalentWeightProvider", () => {
    const mockValue: TalentWeightContextType = {
      talentWeight: "exponential",
      setTalentWeight: expect.any(Function)
    };
    const { result } = renderHook(() => useTalentWeight(), {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <TalentWeightContextProvider>{children}</TalentWeightContextProvider>
      ),
    });
    expect(result.current).toEqual(mockValue);
  });
});
