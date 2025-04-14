import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { OrderSearch } from './OrderSearch';
import { useOrders } from '../OrdersContext';

jest.mock('../OrdersContext', () => ({
  useOrders: jest.fn(),
}));

describe('OrderSearch', () => {
  const mockSetSearchQuery = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useOrders as jest.Mock).mockReturnValue({
      searchQuery: '',
      setSearchQuery: mockSetSearchQuery,
    });
  });

  it('renders the input field with placeholder', () => {
    render(<OrderSearch />);
    const input = screen.getByPlaceholderText('Search by order number');
    expect(input).toBeInTheDocument();
  });

  it('updates search query on input change', () => {
    render(<OrderSearch />);
    const input = screen.getByPlaceholderText('Search by order number');
    fireEvent.change(input, { target: { value: '12345' } });
    expect(mockSetSearchQuery).toHaveBeenCalledWith('12345');
  });

  it('calls onSearch prop when provided', () => {
    const mockOnSearch = jest.fn();
    render(<OrderSearch onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText('Search by order number');
    fireEvent.change(input, { target: { value: '12345' } });
    expect(mockOnSearch).toHaveBeenCalledWith('12345');
  });
});
