import { Formats as FORMATS } from '@d3-stencil/interfaces';
import { Formats } from '@d3-stencil/shared';

export const formatter = (
  type: FORMATS,
  data: number | string,
  currency?: string,
): string | number =>
  type === 'CURRENCY' ? Formats[type](data, currency) : Formats[type](data);
