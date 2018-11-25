import Intl from 'intl';
import { format } from 'd3-format';
import { timeFormat } from 'd3-time-format';
import { Formats } from '@d3-stencil/interfaces';

const currencyFormatter = (data: number, currency: string): string =>
  new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(
    data,
  );

const formats: {
  [format in Formats]: (
    data: string | number,
    currency?: string,
  ) => string | number
} = {
  ['PERCENTAGE']: (data: number) => format('.0%')(data),
  ['GROUPED_TWO_DIGITS']: (data: number) => format('.2s')(data),
  ['GROUPED_THOUSANDS_TWO_DIGITS']: (data: number) => format(',.2r')(data),
  ['CURRENCY']: (data: number, currency: string) =>
    currencyFormatter(data, currency),
  ['SHORT_MONTH']: (data: number) => timeFormat('%b')(new Date(data * 1000)),
  ['LARGE_MONTH']: (data: number) => timeFormat('%B')(new Date(data * 1000)),
  ['DAY_AND_MONTH']: (data: number) =>
    timeFormat('%b %d')(new Date(data * 1000)),
  ['ANY']: (data: string | number) => data,
};

export { formats as Formats };
