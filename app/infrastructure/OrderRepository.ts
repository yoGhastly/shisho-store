import { Order } from "../types";

export interface OrderRepository {
  create(order: Order): Promise<void>;
  search(orderId: Pick<Order, "id">): Promise<Order | null>;
}
