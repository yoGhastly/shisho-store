import { Order } from '../types';
import { OrderSearchCriteria } from './criteria/OrderSearchCriteria';

export interface OrderRepository {
  all(): Promise<Order[]>;
  create(order: Order): Promise<Order | null>;
  search(orderId: string): Promise<Order | undefined>;
  searchBy(criteria: OrderSearchCriteria): Promise<Order[]>;
  changeOrderStatus({
    orderId,
    status,
  }: {
    orderId: string;
    status: string;
  }): Promise<{ status: string; message: string } | undefined>;
}
