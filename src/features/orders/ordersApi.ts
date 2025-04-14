import axios from 'axios';
import { Order } from './types';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchOrders = async (searchQuery = ''): Promise<Order[]> => {
  const response = await axios.get<Order[]>('/orders.json');

  await delay(500);

  const query = searchQuery.toLowerCase();
  return response.data.filter((order) => order.orderNumber.toLowerCase().includes(query));
};
