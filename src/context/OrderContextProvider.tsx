"use client";
import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
} from "react";
import axios from "axios";

interface Dish {
  id: number;
  name: string;
  restaurant: string;
  availableMeals: string[];
}

interface GlobalState {
  step: number;
  mealType: string;
  numberOfPeople: number;
  selectedRestaurant: string;
  dishes: { dishId: string; quantity: number }[];
  dishesData: Dish[];
}

const initialState: GlobalState = {
  step: 1,
  mealType: "",
  numberOfPeople: 1,
  selectedRestaurant: "",
  dishes: [],
  dishesData: [],
};

interface OrderContextType {
  state: GlobalState;
  setState: React.Dispatch<React.SetStateAction<GlobalState>>;
}

export const OrderContext = createContext<OrderContextType | undefined>(
  undefined
);

export const OrderContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<GlobalState>(initialState);
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get(
          "https://raw.githubusercontent.com/G123-jp/react_assignment/master/data/dishes.json"
        );
        setState((currentState) => ({
          ...currentState,
          dishesData: response.data.dishes,
        }));
      } catch (error) {
        console.error("Failed to fetch dishes:", error);
      }
    };

    fetchDishes();
  }, []);

  return (
    <OrderContext.Provider value={{ state, setState }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = (): OrderContextType => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrder must be used within a OrderContextProvider");
  }
  return context;
};
