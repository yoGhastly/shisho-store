import { Order } from "../types";

export interface OrderRepository {
  create(order: Order): Promise<Order | null>;
  search(orderId: string): Promise<Order | undefined>;
}
