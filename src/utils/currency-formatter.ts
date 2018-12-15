const LOCALE = navigator.language || 'en-GB';

export const currencyFormatter = (data: number, currency: string): string =>
  new Intl.NumberFormat(LOCALE, { style: 'currency', currency }).format(data);
