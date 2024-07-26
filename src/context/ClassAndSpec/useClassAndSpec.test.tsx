import React from "react";
import { renderHook } from "@testing-library/react";
import { useClassAndSpec } from "./useClassAndSpec";
import { ClassAndSpecContextType } from "./types";
import { ClassAndSpecContextProvider } from "./ClassAndSpecContext";

describe("useClassAndSpec", () => {
  it("should throw an error if used outside of ClassAndSpecProvider", () => {
    expect(() => {
      renderHook(() => useClassAndSpec());
    }).toThrow("useClassAndSpec must be used within a ClassAndSpecProvider");
  });

  it("should return context value when used within ClassAndSpecProvider", () => {
    const mockValue: ClassAndSpecContextType = {
      currentClass: undefined,
      currentSpec: undefined,
      setCurrentClass: expect.any(Function),
      setCurrentSpec: expect.any(Function),
    };
    const { result } = renderHook(() => useClassAndSpec(), {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <ClassAndSpecContextProvider>{children}</ClassAndSpecContextProvider>
      ),
    });
    expect(result.current).toEqual(mockValue);
  });
});
