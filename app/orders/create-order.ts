import { OrderRepository } from "../infrastructure/OrderRepository";
import { supabase } from "../lib/subapase/client";
import { Order } from "../types";

export class SupabaseOrderRepository implements OrderRepository {
  async create(order: Order): Promise<Order | null> {
    try {
      // Insert the order into the "orders" table
      const { data, error } = await supabase
        .from("orders")
        .insert(order)
        .select("*")
        .single();

      if (error) {
        throw error;
      }

      if (!data) {
        throw new Error(`Order not found in orders table ${order.id}`);
      }
      const newOrder = data as Order;
      console.log({ newOrder });

      return newOrder;
    } catch (error: any) {
      throw new Error(`Failed to create order: ${error.message}`);
    }
  }

  async search(orderId: Pick<Order, "id">): Promise<Order | null> {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("id", orderId)
        .single();

      if (error) {
        throw error;
      }

      if (!data) {
        return null; // Order not found
      }

      const order = data as Order;

      return order;
    } catch (error: any) {
      throw new Error(
        `Failed to search for order ${orderId}: ${error.message}`,
      );
    }
  }
}
