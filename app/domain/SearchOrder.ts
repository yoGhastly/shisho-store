import { OrderRepository } from "../infrastructure/OrderRepository";

export class OrderSearch {
  constructor(private readonly repository: Pick<OrderRepository, "search">) { }

  async search(orderId: string): Promise<void | null> {
    await this.repository.search(orderId);
  }
}
