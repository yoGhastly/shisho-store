import { OrderRepository } from "../infrastructure/OrderRepository";
import { Order } from "../types";

export class OrderSearch {
  constructor(private readonly repository: Pick<OrderRepository, "search">) { }

  async search(orderId: Pick<Order, "id">): Promise<void | null> {
    await this.repository.search(orderId);
  }
}
