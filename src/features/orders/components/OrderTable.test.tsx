import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { OrderTable } from './OrderTable';
import { useOrders } from '../OrdersContext';
import { format } from 'date-fns';

jest.mock('../OrdersContext', () => ({
  useOrders: jest.fn(),
}));

describe('OrderTable', () => {
  it('renders loading skeleton rows when loading is true', () => {
    (useOrders as jest.Mock).mockReturnValue({ orders: [], loading: true });

    render(<OrderTable />);

    const skeletonRows = screen.getAllByRole('row', { hidden: true });
    expect(skeletonRows).toHaveLength(4); // 3 skeleton rows + header rows
  });

  it('renders "No results found" when there are no orders', () => {
    (useOrders as jest.Mock).mockReturnValue({ orders: [], loading: false });

    render(<OrderTable />);

    expect(screen.getByText('No results found.')).toBeInTheDocument();
  });

  it('renders orders correctly', () => {
    const mockOrders = [
      {
        orderNumber: '12345',
        createdAt: '2023-10-01T10:00:00Z',
        dueDate: '2023-10-10T10:00:00Z',
        total: 100.5,
        status: 'PAID',
      },
      {
        orderNumber: '67890',
        createdAt: '2023-10-02T12:00:00Z',
        dueDate: '2023-10-15T12:00:00Z',
        total: 200.75,
        status: 'UNPAID',
      },
    ];

    (useOrders as jest.Mock).mockReturnValue({ orders: mockOrders, loading: false });

    render(<OrderTable />);

    mockOrders.forEach((order) => {
      expect(screen.getByText(order.orderNumber)).toBeInTheDocument();
      expect(
        screen.getByText(format(new Date(order.createdAt), 'MMM dd, yyyy, HH:mm'))
      ).toBeInTheDocument();
      expect(screen.getByText(format(new Date(order.dueDate), 'MMM dd, yyyy'))).toBeInTheDocument();
      expect(screen.getByText(`€${order.total.toFixed(2)}`)).toBeInTheDocument();
      expect(screen.getByText(order.status)).toBeInTheDocument();
    });
  });

  it('applies correct status color classes', () => {
    const mockOrders = [
      {
        orderNumber: '12345',
        createdAt: '2023-10-01T10:00:00Z',
        dueDate: '2023-10-10T10:00:00Z',
        total: 100.5,
        status: 'PAID',
      },
      {
        orderNumber: '67890',
        createdAt: '2023-10-02T12:00:00Z',
        dueDate: '2023-10-05T12:00:00Z',
        total: 200.75,
        status: 'UNPAID',
      },
    ];

    (useOrders as jest.Mock).mockReturnValue({ orders: mockOrders, loading: false });

    render(<OrderTable />);

    const paidStatus = screen.getByText('PAID');
    const unpaidStatus = screen.getByText('UNPAID');

    expect(paidStatus).toHaveClass('text-customGreen');
    expect(unpaidStatus).toHaveClass('text-customRed');
  });
});
