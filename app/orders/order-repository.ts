import { OrderRepository } from '../infrastructure/OrderRepository';
import { supabase } from '../lib/subapase/client';
import { Order } from '../types';
import { OrderSearchCriteria } from '../infrastructure/criteria/OrderSearchCriteria';
import { Status } from './chip-status';
import { revalidatePath } from 'next/cache';
import { select } from '@nextui-org/react';

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
    'use server';
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
  async changeOrderStatus({
    orderId,
    status,
  }: {
    orderId: string;
    status: Status;
  }): Promise<
    { oldValue: Status; status: Status; message: string } | undefined
  > {
    'use server';
    try {
      const { data, error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId)
        .select('*')
        .single();

      if (error) {
        throw error;
      }
      const order = data as Order;

      return {
        oldValue: status,
        status: order.status,
        message: `Order status changed to ${order.status}`,
      };
    } catch (error) {
      console.error('Error changing order status:', error);
    }
  }
}
