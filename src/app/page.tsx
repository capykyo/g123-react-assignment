"use client";
import StepIndicator from "@/components/StepIndicator";
import MealTypeSelector from "@/components/MealTypeSelector";
import NumberOfPeopleInput from "@/components/NumberOfPeopleInput";
import RestaurantSelector from "@/components/RestaurantSelector";
import DishSelector from "@/components/DishSelector";
import ReviewOrder from "@/components/ReviewOrder";
import NavigationButtons from "@/components/NavigationButtons";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { useOrder } from "@/context/OrderContextProvider";

export default function Home() {
  const { state } = useOrder();
  return (
    <div className="max-w-md mx-auto">
      <StepIndicator />
      <div className="min-h-[200px] m-10 px-4">
        <SwitchTransition mode="out-in">
          <CSSTransition
            key={state.step}
            addEndListener={(node, done) =>
              node.addEventListener("transitionend", done, false)
            }
            classNames="fade"
          >
            <div className="flex flex-col gap-4">
              {state.step === 1 && (
                <div>
                  <p className="font-bold mb-2">Please select a meal:</p>
                  <MealTypeSelector />
                </div>
              )}
              {state.step === 1 && (
                <div>
                  <p className="font-bold mb-2">
                    Please enter number of people:
                  </p>
                  <NumberOfPeopleInput />
                </div>
              )}
              {state.step === 2 && <RestaurantSelector />}
              {state.step === 3 && <DishSelector />}
              {state.step === 4 && <ReviewOrder />}
            </div>
          </CSSTransition>
        </SwitchTransition>
      </div>
      <NavigationButtons />
    </div>
  );
}
