import { useState } from "react";
import { useOrder } from "@/context/OrderContextProvider";
import { InputNumber } from "antd";

const NumberOfPeopleInput = () => {
  const { state, setState } = useOrder();
  const [error, setError] = useState(false);

  const handleChange = (value: number | null) => {
    if (value !== null) {
      setState({ ...state, numberOfPeople: value });
    }
  };
  const handleBlur = () => {
    const value = state.numberOfPeople;
    if (value && value > 0 && value <= 10) {
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div className="flex">
      <InputNumber
        min={1}
        value={state.numberOfPeople}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`${error ? "border-red-500" : "border-gray-300"} w-full`}
      ></InputNumber>
      {error && (
        <div className="text-red-500 text-sm ml-2">
          The maximum number of diners is 10.
        </div>
      )}
    </div>
  );
};

export default NumberOfPeopleInput;
