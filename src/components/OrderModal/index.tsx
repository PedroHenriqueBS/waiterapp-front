import { ModalBody, Overlay, OrderDetails, Actions } from "./styles";
import closeIcon from "../../assets/images/close-icon.svg";
import type { Order } from "../../types/Order";
import { formatCurrency } from "../../utils/formatCurrency";
import { useEffect } from "react";

interface OrderModalProps {
  open: boolean;
  onClose: () => void;
  order: null | Order;
}

export function OrderModal({ open, onClose, order }: OrderModalProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open || !order) return null;

  const total = order.products.reduce((total, { product, quantity }) => {
    return total + product.price * quantity;
  }, 0);

  return (
    <Overlay onClick={onClose}>
      <ModalBody>
        <header>
          <strong>Mesa {order.table}</strong>

          <button onClick={onClose}>
            <img src={closeIcon} alt="Fechar" />
          </button>
        </header>

        <div className="status-container">
          <small>Status do pedido</small>
          <div>
            <span>
              {order.status === "WAITING"
                ? "🕒"
                : order.status === "IN_PRODUCTION"
                  ? "👩‍🍳"
                  : "✅"}
            </span>
            <strong>
              {order.status === "WAITING"
                ? "Fila de espera"
                : order.status === "IN_PRODUCTION"
                  ? "Em preparação"
                  : "Pronto"}
            </strong>
          </div>
        </div>

        <OrderDetails>
          <strong>Itens</strong>

          <div className="order-items">
            {order.products.map(({ _id, product, quantity }) => (
              <div className="item" key={_id}>
                <img
                  width={80}
                  src={`http://localhost:3001/uploads/${product.imagePath}`}
                  alt={product.name}
                />
                <span className="quantity">{quantity}x</span>
                <div className="product-details">
                  <strong>{product.name}</strong>
                  <span>{formatCurrency(product.price)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="total">
            <span>Total:</span>
            <strong>{formatCurrency(total)}</strong>
          </div>
        </OrderDetails>

        <Actions>
          <button
            type="button"
            className="primary"
            disabled={order.status !== "WAITING"}
          >
            <span>Iniciar produção</span>
          </button>
          <button
            type="button"
            className="secondary"
            disabled={order.status !== "WAITING"}
          >
            <span>Cancelar pedido</span>
          </button>
        </Actions>
      </ModalBody>
    </Overlay>
  );
}
