import { useOrders } from '../OrdersContext';
import { isBefore, isToday, parseISO } from 'date-fns';
import { formatCurrency, formatDate, formatDateTime } from '@/utils/format';
import clsx from 'clsx';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';

export const OrderTable: React.FC = () => {
  const { orders, loading } = useOrders();

  const getStatusColor = (status: string, dueDate: string) => {
    const due = parseISO(dueDate);
    if (status === 'PAID') return 'text-customGreen';
    if (status === 'UNPAID' && isBefore(due, new Date())) return 'text-customRed';
    if (status === 'UNPAID' && (isToday(due) || !isBefore(due, new Date())))
      return 'text-customYellow';
    return '';
  };

  const SkeletonRow = () => (
    <TableRow className="animate-pulse">
      {Array.from({ length: 5 }).map((_, i) => (
        <TableCell key={i}>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </TableCell>
      ))}
    </TableRow>
  );

  return (
    <div className="rounded-[4px] border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order #</TableHead>
            <TableHead>Created at</TableHead>
            <TableHead>Due date</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => <SkeletonRow key={i} />)
          ) : orders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-gray-500">
                No results found.
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order, index) => (
              <TableRow key={order.orderNumber} className={index % 2 === 0 ? 'bg-customGrey' : ''}>
                <TableCell>{order.orderNumber}</TableCell>
                <TableCell>{formatDateTime(order.createdAt)}</TableCell>
                <TableCell>{formatDate(order.dueDate)}</TableCell>
                <TableCell className="text-right">{formatCurrency(order.total)}</TableCell>
                <TableCell
                  className={clsx(
                    'font-bold text-right',
                    getStatusColor(order.status, order.dueDate)
                  )}
                >
                  {order.status}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
