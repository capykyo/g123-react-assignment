import React, { useContext, useState, useEffect } from "react";
import { OrderContext } from "@/context/OrderContextProvider";
import { Select } from "antd";

const RestaurantSelector = () => {
  const context = useContext(OrderContext);
  const [availableRestaurants, setAvailableRestaurants] = useState<string[]>(
    []
  );

  useEffect(() => {
    const filteredRestaurants = context?.state.dishesData
      .filter((dish) => dish.availableMeals.includes(context?.state.mealType))
      .map((dish) => dish.restaurant);
    const uniqueRestaurants = Array.from(new Set(filteredRestaurants));
    setAvailableRestaurants(uniqueRestaurants);
  }, [context?.state.mealType, context?.state.dishesData]);

  const handleChange = (value: string) => {
    if (context && value) {
      const { state, setState } = context;
      setState({ ...state, selectedRestaurant: value });
    }
  };

  return (
    <Select
      value={context?.state.selectedRestaurant}
      onChange={handleChange}
      placeholder="Select a restaurant"
      style={{ width: 200 }}
    >
      {availableRestaurants.map((restaurant) => (
        <Select.Option key={restaurant} value={restaurant}>
          {restaurant}
        </Select.Option>
      ))}
    </Select>
  );
};

export default RestaurantSelector;
