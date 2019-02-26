import { currencyFormatter } from './../currency-formatter';

describe('currency-formatter', () => {
  const amount = 10000;

  it('Should return €10,000.00. Using en-GB locale', () => {
    const result = currencyFormatter(amount, 'EUR');

    expect(result).toEqual('€10,000.00');
  });

  it('Should return $10,000.00. Using en-GB locale', () => {
    const result = currencyFormatter(amount, 'USD');

    expect(result).toEqual('$10,000.00');
  });
});
