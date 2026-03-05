import { useEffect, useState } from "react";
import { OrdersBoards } from "../OrdersBoards";
import { Container } from "./styles";
import type { Order } from "../../types/Order";
import { api } from "../../utils/api";

export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    api.get("/orders").then(({ data }) => {
      setOrders(data);
    });
  }, []);

  const waitingOrders = orders.filter((order) => order.status === "WAITING");
  const inPreparationOrders = orders.filter((order) => order.status === "IN_PRODUCTION");
  const readyToServeOrders = orders.filter((order) => order.status === "DONE");

  function handleDeleteOrder(orderId: string) {
    setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
  }

  function handleOrderStatusChange(orderId: string, status: Order["status"]) {
    setOrders((prevOrders) => prevOrders.map((order) => (order._id === orderId ? { ...order, status } : order)));
  }

  return (
    <Container>
      <OrdersBoards
        icon="🕒"
        title="Fila de espera"
        orders={waitingOrders}
        onDeleteOrder={handleDeleteOrder}
        onChangeOrderStatus={handleOrderStatusChange}
      />
      <OrdersBoards
        icon="🍽️"
        title="Em preparação"
        orders={inPreparationOrders}
        onDeleteOrder={handleDeleteOrder}
        onChangeOrderStatus={handleOrderStatusChange}
      />
      <OrdersBoards
        icon="✅"
        title="Pronto para servir"
        orders={readyToServeOrders}
        onDeleteOrder={handleDeleteOrder}
        onChangeOrderStatus={handleOrderStatusChange}
      />
    </Container>
  );
}
