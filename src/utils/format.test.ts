import { formatCurrency, formatDate, formatDateTime } from './format';

describe('formatCurrency', () => {
  it('should format a number as currency in EUR', () => {
    expect(formatCurrency(1234.56)).toBe('€1,234.56');
    expect(formatCurrency(0)).toBe('€0.00');
    expect(formatCurrency(-1234.56)).toBe('-€1,234.56');
  });
});

describe('formatDate', () => {
  it('should format a date string as "MMM dd, yyyy"', () => {
    expect(formatDate('2023-10-01')).toBe('Oct 01, 2023');
    expect(formatDate('2000-01-01')).toBe('Jan 01, 2000');
  });

  it('should throw an error for invalid date strings', () => {
    expect(() => formatDate('invalid-date')).toThrow();
  });
});

describe('formatDateTime', () => {
  it('should format a date-time string as "MMM dd, yyyy, HH:mm"', () => {
    expect(formatDateTime('2023-10-01T15:30:00')).toBe('Oct 01, 2023, 15:30');
    expect(formatDateTime('2000-01-01T00:00:00')).toBe('Jan 01, 2000, 00:00');
  });

  it('should throw an error for invalid date-time strings', () => {
    expect(() => formatDateTime('invalid-datetime')).toThrow();
  });
});
