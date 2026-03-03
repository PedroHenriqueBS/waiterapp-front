import { useState } from "react";
import type { Order } from "../../types/Order";
import { Board, OrdersContainer } from "./styles";
import { OrderModal } from "../OrderModal";

interface OrdersBoardsProps {
  icon: string;
  title: string;
  orders: Order[];
}

export function OrdersBoards({ icon, title, orders }: OrdersBoardsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<null | Order>(null);

  function handleOpenModal(order: Order) {
    setSelectedOrder(order);
    setIsModalOpen(true);
  }

  return (
    <Board>
      <OrderModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        order={selectedOrder}
      />
      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>({orders.length})</span>
      </header>

      {orders.length > 0 && (
        <OrdersContainer>
          {orders.map((order) => (
            <button
              type="button"
              key={order._id}
              onClick={() => handleOpenModal(order)}
            >
              <strong>Mesa: {order.table}</strong>
              <span>{order.products.length} itens</span>
            </button>
          ))}
        </OrdersContainer>
      )}
    </Board>
  );
}
