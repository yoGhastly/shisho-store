import { OrderRepository } from "../infrastructure/OrderRepository";
import { Order } from "../types";

export class OrderRegistrar {
  constructor(private readonly repository: OrderRepository) { }

  async register(order: Order): Promise<void> {
    await this.repository.create(order);
  }
}
