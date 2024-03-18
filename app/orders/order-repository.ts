import { cookies } from "next/headers";
import { OrderRepository } from "../infrastructure/OrderRepository";
import { supabase } from "../lib/subapase/client";
import { Order } from "../types";

export class SupabaseOrderRepository implements OrderRepository {
  async create(order: Order): Promise<Order | null> {
    "use server";
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
      cookies().set("attached_email", newOrder.customerEmail);

      return newOrder;
    } catch (error: any) {
      throw new Error(`Failed to create order: ${error.message}`);
    }
  }

  async search(orderId: string): Promise<Order | undefined> {
    "use server";
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
        throw new Error(`Order not found`);
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
