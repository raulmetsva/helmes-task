import { Route, Routes } from 'react-router-dom';
import OrdersPage from './views/OrdersPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<OrdersPage />} />
    </Routes>
  );
}

export default App;
