import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { OrderContext } from "@/context/OrderContextProvider";
import MealTypeSelector from "../MealTypeSelector";
import { Select } from "antd";

vi.mock("antd", () => {
  const originalModule = vi.importActual("antd");
  return {
    __esModule: true,
    ...originalModule,
    Select: vi.fn(() => <div>Select Mock</div>),
  };
});

const renderWithMockContext = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <OrderContext.Provider value={providerProps}>{ui}</OrderContext.Provider>,
    renderOptions
  );
};

describe("MealTypeSelector", () => {
  it("should update context when a meal type is selected", async () => {
    const setState = vi.fn();
    const state = { mealType: "" };
    const providerProps = { state, setState };

    renderWithMockContext(<MealTypeSelector />, { providerProps });

    fireEvent.change(screen.getByText("Lunch"), {
      target: { value: "lunch" },
    });

    expect(setState).toHaveBeenCalledWith({ ...state, mealType: "lunch" });
  });
});
