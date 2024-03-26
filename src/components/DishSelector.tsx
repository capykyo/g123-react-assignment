import React, { useState } from "react";
import { useOrder } from "@/context/OrderContextProvider";
import { Button, InputNumber, Select, notification } from "antd";

const DishSelector = () => {
  const { state, setState } = useOrder();
  const [selectedDish, setSelectedDish] = useState<string>("");
  const [servings, setServings] = useState<number>(1);

  const filteredDishes = state.dishesData.filter(
    (dish) =>
      dish.restaurant === state.selectedRestaurant &&
      dish.availableMeals.includes(state.mealType)
  );

  const handleServingsChange = (value: number | null) => {
    if (value !== null) {
      setServings(value);
    }
  };

  const handleAddDish = () => {
    if (!selectedDish) {
      notification.error({
        message: "No Dish Selected",
        description: "Please select a dish before adding.",
        duration: 2,
      });
      return;
    }
    const totalServings = state.dishes.reduce(
      (acc, dish) => acc + dish.quantity,
      servings
    );

    if (totalServings > state.numberOfPeople) {
      notification.error({
        message: "Not Enough Servings",
        description: `The total servings of dishes must be at least equal to the number of people (${state.numberOfPeople}).`,
        duration: 2,
      });
      return;
    }
    const existingDishIndex = state.dishes.findIndex(
      (dish) => dish.dishId === selectedDish
    );

    if (existingDishIndex >= 0) {
      const updatedDishes = state.dishes.map((dish, index) => {
        if (index === existingDishIndex) {
          return { ...dish, quantity: dish.quantity + servings };
        }
        return dish;
      });
      setState({ ...state, dishes: updatedDishes });
      notification.success({
        message: "Updated Dish Quantity",
        description: "The quantity of the selected dish has been updated.",
        duration: 2,
      });
    } else {
      const newSelection = { dishId: selectedDish, quantity: servings };
      if (newSelection.dishId) {
        setState({ ...state, dishes: [...state.dishes, newSelection] });
        notification.success({
          message: "Dish Added",
          description: "A new dish has been added to your order.",
          duration: 2,
        });
      }
    }

    setSelectedDish("");
    setServings(1);
  };

  return (
    <div>
      <Select
        value={selectedDish}
        onChange={setSelectedDish}
        placeholder="Please Select a Dish"
        style={{ width: 180 }}
      >
        {filteredDishes.map((dish) => (
          <Select.Option key={dish.id} value={dish.name}>
            {dish.name}
          </Select.Option>
        ))}
      </Select>

      <InputNumber
        min={1}
        value={servings}
        onChange={handleServingsChange}
        style={{ marginLeft: 10 }}
      />

      <Button
        onClick={handleAddDish}
        type="primary"
        shape="circle"
        icon={<span>+</span>}
        style={{ marginLeft: 10 }}
      />
    </div>
  );
};

export default DishSelector;
