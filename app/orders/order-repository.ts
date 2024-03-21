import { cookies } from 'next/headers';
import { OrderRepository } from '../infrastructure/OrderRepository';
import { supabase } from '../lib/subapase/client';
import { Order } from '../types';
import { OrderSearchCriteria } from '../infrastructure/criteria/OrderSearchCriteria';

export class SupabaseOrderRepository implements OrderRepository {
  async create(order: Order): Promise<Order | null> {
    'use server';
    try {
      // Insert the order into the "orders" table
      const { data, error } = await supabase
        .from('orders')
        .insert(order)
        .select('*')
        .single();

      if (error) {
        throw error;
      }

      if (!data) {
        throw new Error(`Order not found in orders table ${order.id}`);
      }
      const newOrder = data as Order;

      return newOrder;
    } catch (error: any) {
      throw new Error(`Failed to create order: ${error.message}`);
    }
  }

  async all(): Promise<Order[]> {
    'use server';
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`No orders found on all() method.`);
    }

    return (data as Order[]) || [];
  }

  async search(orderId: string): Promise<Order | undefined> {
    'use server';
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
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
  async searchBy(criteria: OrderSearchCriteria): Promise<Order[]> {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .match(criteria)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return (data as Order[]) || [];
    } catch (error) {
      console.error('Error searching orders:', error);
      return [];
    }
  }
}
