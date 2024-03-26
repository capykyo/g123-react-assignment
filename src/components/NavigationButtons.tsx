import { Button, notification } from "antd";
import { useOrder } from "@/context/OrderContextProvider";

const NavigationButtons = () => {
  const { state, setState } = useOrder();

  const goToPreviousStep = () => {
    setState((currentState) => {
      const newState = { ...currentState };
      if (newState.step === 2) {
        newState.selectedRestaurant = "";
      } else if (newState.step >= 3) {
        newState.dishes = [];
      }

      newState.step = newState.step - 1;
      return newState;
    });
  };

  const goToNextStep = () => {
    if (state.step === 3 && state.dishes.length === 0) {
      notification.error({
        message: "No Dishes Added",
        description: "You must add at least one dish to continue.",
        duration: 4,
      });
      return;
    }
    if (
      (state.step === 1 &&
        state.mealType &&
        state.numberOfPeople > 0 &&
        state.numberOfPeople <= 10) ||
      (state.step === 2 && state.selectedRestaurant) ||
      (state.step === 3 && state.dishes.length > 0)
    ) {
      setState((currentState) => ({
        ...currentState,
        step: currentState.step + 1,
      }));
    } else {
      notification.error({
        message: "Incomplete Information",
        description: "Please complete all fields before proceeding.",
        duration: 4,
      });
    }
  };

  const submitOrder = () => {
    console.log("Submitting order...", state);
  };

  return (
    <div className="flex justify-between px-4">
      <div>
        {state.step > 1 && <Button onClick={goToPreviousStep}>Previous</Button>}
      </div>
      <div>
        {state.step < 4 && (
          <Button
            onClick={goToNextStep}
            disabled={
              (state.step === 1 &&
                (state.numberOfPeople > 10 || state.numberOfPeople < 1)) ||
              (state.step === 3 && state.dishes.length === 0)
            }
            className="ml-auto"
          >
            Next
          </Button>
        )}
        {state.step === 4 && (
          <Button onClick={submitOrder} type="primary" className="ml-auto">
            Submit
          </Button>
        )}
      </div>
    </div>
  );
};

export default NavigationButtons;
