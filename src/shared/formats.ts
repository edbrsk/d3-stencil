import { format } from 'd3-format';
import { timeFormat } from 'd3-time-format';
import { Formats as FORMATS } from './../interfaces';

const formats: { [format: string]: (data: any, CURRENCY?: string) => any } = {
  [FORMATS.PERCENTAGE]: data => format('.0%')(data),
  [FORMATS.GROUPED_TWO_DIGITS]: data => format('.2s')(data),
  [FORMATS.GROUPED_THOUSANDS_TWO_DIGITS]: data => format(',.2r')(data),
  [FORMATS.CURRENCY]: (data, CURRENCY) =>
    data.toLocaleString(navigator.language, {
      style: 'currency',
      currency: CURRENCY
    }),
  [FORMATS.SHORT_MONTH]: data => timeFormat('%b')(new Date(data * 1000)),
  [FORMATS.LARGE_MONTH]: data => timeFormat('%B')(new Date(data * 1000)),
  [FORMATS.DAY_AND_MONTH]: data => timeFormat('%b %d')(new Date(data * 1000)),
  [FORMATS.ANY]: data => data
};

export { formats as Formats };
