import { formatter } from './../../src/utils';
import { Formats } from './../../src/interfaces';

describe('formatter', () => {
  const inputs = {
    percentage: 0.5,
    groupedTwoDigits: 2550,
    groupedThousandsTwoDigits: 2550,
    currency: 10,
    shortMonth: 1523442599,
    largeMonth: 1523442599,
    dayAndMonth: 1523442599,
    any: 'simple text'
  };

  it('Should return a string formatted like a percentage', () => {
    const result = formatter(Formats.PERCENTAGE, inputs.percentage);
    expect(result).toEqual('50%');
  });

  it('Should return a string grouped with two digits', () => {
    const result = formatter(
      Formats.GROUPED_TWO_DIGITS,
      inputs.groupedTwoDigits
    );

    expect(result).toEqual('2.6k');
  });

  it('Should return a string grouped per thousands with two digits', () => {
    const result = formatter(
      Formats.GROUPED_THOUSANDS_TWO_DIGITS,
      inputs.groupedThousandsTwoDigits
    );

    expect(result).toEqual('2,600');
  });

  it('Should return the same as input', () => {
    const result = formatter(Formats.ANY, inputs.any);
    expect(result).toEqual(inputs.any);
  });

  describe('formatter: Should return a string in currency format specified', () => {
    it('should return a string in EUR format', () => {
      const result = formatter(Formats.CURRENCY, inputs.currency, 'EUR');

      expect(result).toEqual('€10.00');
    });

    it('should return a string in USD format', () => {
      const result = formatter(Formats.CURRENCY, inputs.currency, 'USD');

      expect(result).toEqual('$10.00');
    });

    it('should return a string in GBP format', () => {
      const result = formatter(Formats.CURRENCY, inputs.currency, 'GBP');

      expect(result).toEqual('£10.00');
    });
  });

  describe('formatter: Should return a string in differents formats with timestamp as input', () => {
    it('Should return a string in format short month', () => {
      const result = formatter(Formats.SHORT_MONTH, inputs.shortMonth);

      expect(result).toEqual('Apr');
    });

    it('Should return a string in format large month', () => {
      const result = formatter(Formats.LARGE_MONTH, inputs.shortMonth);

      expect(result).toEqual('April');
    });

    it('Should return a string in format day and month', () => {
      const result = formatter(Formats.DAY_AND_MONTH, inputs.shortMonth);

      expect(result).toEqual('Apr 11');
    });
  });
});
