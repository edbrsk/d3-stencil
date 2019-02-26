import { Formats as FORMATS } from '@d3-stencil/interfaces';
import { Formats } from './formats';

export const formatter = (
  type: FORMATS,
  data: number | string | Date | { valueOf(): number },
  currency?: string,
): string =>
  type === 'CURRENCY' ? Formats[type](data, currency) : Formats[type](data);
