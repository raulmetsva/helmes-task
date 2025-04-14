import { Button } from '@/components/ui/Button';
import { H1 } from '@/components/ui/Typography';

import { OrderSearch } from '@/features/orders/components/OrderSearch';
import { OrderTable } from '@/features/orders/components/OrderTable';
import { useOrders } from '@/features/orders/OrdersContext';

import { RefreshIcon } from '@/components/ui/Icon';

function OrdersPage() {
  const { refreshOrders } = useOrders();

  return (
    <div className="max-w-[734px] mx-auto p-4 mt-24 text-black">
      <div className="flex items-center justify-between mb-4">
        <H1>Orders</H1>
        <Button onClick={refreshOrders}>
          <RefreshIcon className="h-4 w-4" />
          Refresh
        </Button>
      </div>
      <OrderSearch />
      <OrderTable />
    </div>
  );
}

export default OrdersPage;
