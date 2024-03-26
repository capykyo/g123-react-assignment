import { useOrder } from "@/context/OrderContextProvider";
import { Table } from "antd";

const ReviewOrder = () => {
  const { state } = useOrder();
  const dataSource = [
    {
      key: "meal",
      category: "Meal",
      value: state.mealType,
    },
    {
      key: "people",
      category: "Number of People",
      value: state.numberOfPeople,
    },
    {
      key: "restaurant",
      category: "Restaurant",
      value: state.selectedRestaurant,
    },
    {
      key: "dishes",
      category: "Dishes",
      value: state.dishes
        .map((dish) => `${dish.dishId} - ${dish.quantity} serving(s)`)
        .join(", "),
    },
  ];

  const columns = [
    {
      title: "",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "",
      dataIndex: "value",
      key: "value",
    },
  ];

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      pagination={false}
      showHeader={false}
      rowClassName={() => "custom-row-style"}
    />
  );
};

export default ReviewOrder;
