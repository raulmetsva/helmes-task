export interface Order {
  orderNumber: string;
  total: number;
  dueDate: string;
  createdAt: string;
  status: 'PAID' | 'UNPAID';
}
