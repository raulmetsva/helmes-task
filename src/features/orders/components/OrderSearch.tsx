import { Input } from '@/components/ui/Input';
import { ChangeEvent } from 'react';
import { useOrders } from '../OrdersContext';

interface OrderSearchProps {
  onSearch?: (query: string) => void;
}

export const OrderSearch: React.FC<OrderSearchProps> = ({ onSearch }) => {
  const { searchQuery, setSearchQuery } = useOrders();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <div className="mb-3">
      <Input placeholder="Search by order number" value={searchQuery} onChange={handleChange} />
    </div>
  );
};
