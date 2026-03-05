import { useState } from "react";
import { toast } from "react-toastify";

import type { Order } from "../../types/Order";
import { Board, OrdersContainer } from "./styles";
import { OrderModal } from "../OrderModal";
import { api } from "../../utils/api";

interface OrdersBoardsProps {
  icon: string;
  title: string;
  orders: Order[];
  onDeleteOrder: (orderId: string) => void;
  onChangeOrderStatus: (orderId: string, status: Order["status"]) => void;
}

export function OrdersBoards({ icon, title, orders, onDeleteOrder, onChangeOrderStatus }: OrdersBoardsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<null | Order>(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleOpenModal(order: Order) {
    setIsModalOpen(true);
    setSelectedOrder(order);
  }

  async function handleChangeOrderStatus() {
    setIsLoading(true);

    const status = selectedOrder?.status === "WAITING" ? "IN_PRODUCTION" : "DONE";

    await api.patch(`/orders/${selectedOrder?._id}`, { status });

    onChangeOrderStatus(selectedOrder!._id, status);
    setIsLoading(false);
    setIsModalOpen(false);
    toast.success(`Pedido da mesa ${selectedOrder?.table} foi atualizado com sucesso!`);
  }

  async function handleDeleteOrder() {
    setIsLoading(true);
    await api.delete(`/orders/${selectedOrder?._id}`, {});
    onDeleteOrder(selectedOrder!._id);
    setIsLoading(false);
    setIsModalOpen(false);
    toast.success(`Pedido da mesa ${selectedOrder?.table} foi cancelado com sucesso!`);
  }

  return (
    <Board>
      <OrderModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        order={selectedOrder}
        onDelete={handleDeleteOrder}
        isLoading={isLoading}
        onChangeOrderStatus={handleChangeOrderStatus}
      />
      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>({orders.length})</span>
      </header>

      {orders.length > 0 && (
        <OrdersContainer>
          {orders.map((order) => (
            <button type="button" key={order._id} onClick={() => handleOpenModal(order)}>
              <strong>Mesa: {order.table}</strong>
              <span>{order.products.length} itens</span>
            </button>
          ))}
        </OrdersContainer>
      )}
    </Board>
  );
}
