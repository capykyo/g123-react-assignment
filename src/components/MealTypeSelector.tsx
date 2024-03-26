import React, { useContext } from "react";
import { OrderContext } from "@/context/OrderContextProvider";
import { Select } from "antd";

const MealTypeSelector = () => {
  const context = useContext(OrderContext);
  const handleChange = (value: string) => {
    if (context) {
      const { state, setState } = context;
      setState({ ...state, mealType: value });
    }
  };

  return (
    <Select
      data-testid="meal-select-combobox"
      value={context?.state.mealType}
      onChange={handleChange}
      placeholder="Select a meal"
      style={{ width: 240 }}
      aria-label="Select"
    >
      <Select.Option value="breakfast">Breakfast</Select.Option>
      <Select.Option value="lunch">Lunch</Select.Option>
      <Select.Option value="dinner">Dinner</Select.Option>
    </Select>
  );
};

export default MealTypeSelector;
