import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Order } from './types';
import { fetchOrders } from './ordersApi';

interface OrdersContextType {
  orders: Order[];
  loading: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  refreshOrders: () => void;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export const OrdersProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  const loadOrders = async (query = '') => {
    setLoading(true);
    const data = await fetchOrders(query);
    setOrders(data);
    setLoading(false);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  const refreshOrders = () => {
    loadOrders(debouncedQuery);
  };

  useEffect(() => {
    if (debouncedQuery.length >= 2 || debouncedQuery.length === 0) {
      loadOrders(debouncedQuery);
    }
  }, [debouncedQuery]);

  return (
    <OrdersContext.Provider value={{ orders, loading, searchQuery, setSearchQuery, refreshOrders }}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = (): OrdersContextType => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrdersProvider');
  }
  return context;
};
