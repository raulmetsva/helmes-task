import { render, act } from '@testing-library/react';
import { OrdersProvider, useOrders } from './OrdersContext';
import { fetchOrders } from './ordersApi';
import { ReactNode } from 'react';

jest.mock('./ordersApi', () => ({
  fetchOrders: jest.fn(),
}));

const mockFetchOrders = fetchOrders as jest.MockedFunction<typeof fetchOrders>;

const TestComponent = ({ children }: { children?: ReactNode }) => {
  const { orders, loading, searchQuery, setSearchQuery, refreshOrders } = useOrders();

  return (
    <div>
      <div data-testid="loading">{loading ? 'Loading' : 'Not Loading'}</div>
      <div data-testid="orders">{JSON.stringify(orders)}</div>
      <div data-testid="searchQuery">{searchQuery}</div>
      <button onClick={() => setSearchQuery('test')}>Set Search Query</button>
      <button onClick={refreshOrders}>Refresh Orders</button>
      {children}
    </div>
  );
};

describe('OrdersContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should provide default values', () => {
    mockFetchOrders.mockResolvedValueOnce([]);

    const { getByTestId } = render(
      <OrdersProvider>
        <TestComponent />
      </OrdersProvider>
    );

    expect(getByTestId('loading').textContent).toBe('Loading');
    expect(getByTestId('orders').textContent).toBe('[]');
    expect(getByTestId('searchQuery').textContent).toBe('');
  });

  it('should fetch orders on mount', async () => {
    mockFetchOrders.mockResolvedValueOnce([
      {
        orderNumber: 'O1283823',
        dueDate: '2024-12-27',
        createdAt: '2024-12-20T12:23:43Z',
        total: 10293.48,
        status: 'PAID',
      },
    ]);

    await act(async () => {
      render(
        <OrdersProvider>
          <TestComponent />
        </OrdersProvider>
      );
    });

    expect(mockFetchOrders).toHaveBeenCalledWith('');
  });

  it('should update search query', async () => {
    mockFetchOrders.mockResolvedValueOnce([]);

    const { getByTestId, getByText } = render(
      <OrdersProvider>
        <TestComponent />
      </OrdersProvider>
    );

    act(() => {
      getByText('Set Search Query').click();
    });

    expect(getByTestId('searchQuery').textContent).toBe('test');
  });

  it('should refresh orders', async () => {
    mockFetchOrders.mockResolvedValueOnce([]);
    mockFetchOrders.mockResolvedValueOnce([
      {
        orderNumber: 'O1449379',
        dueDate: '2025-04-20',
        createdAt: '2024-12-15T14:12:25Z',
        total: 683.34,
        status: 'UNPAID',
      },
    ]);

    const { getByText } = render(
      <OrdersProvider>
        <TestComponent />
      </OrdersProvider>
    );

    await act(async () => {
      getByText('Refresh Orders').click();
    });

    expect(mockFetchOrders).toHaveBeenCalledTimes(2);
  });
});
