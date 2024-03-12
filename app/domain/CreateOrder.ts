import { OrderRepository } from "../infrastructure/OrderRepository";
import { Order } from "../types";

export class CreateOrder {
  constructor(private readonly repository: OrderRepository) { }

  async create(order: Order): Promise<Order | null> {
    return await this.repository.create(order);
  }
}
