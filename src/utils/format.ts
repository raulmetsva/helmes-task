import { format, parseISO } from 'date-fns';

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
  }).format(value);
};

export const formatDate = (date: string): string => {
  return format(parseISO(date), 'MMM dd, yyyy');
};

export const formatDateTime = (dateTime: string): string => {
  return format(parseISO(dateTime), 'MMM dd, yyyy, HH:mm');
};
