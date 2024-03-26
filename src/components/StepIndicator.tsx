import React, { useContext } from "react";
import { OrderContext } from "@/context/OrderContextProvider";

const StepIndicator = () => {
  const context = useContext(OrderContext);

  const steps = [
    "Select Meal",
    "Select Restaurant",
    "Select Dishes",
    "Review Order",
  ];

  return (
    <div className="step-indicator">
      <ul className="flex justify-around p-4">
        {steps.map((step, index) => (
          <li
            key={index}
            className={`step p-2 cursor-pointer ${
              context?.state.step === index + 1
                ? "active bg-blue-700 rounded-md text-white"
                : ""
            }`}
          >
            {step}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StepIndicator;
