import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { OrdersProvider } from './features/orders/OrdersContext';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <OrdersProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </OrdersProvider>
  </StrictMode>
);
