import { Formats as FORMATS } from '@d3-stencil/interfaces';
import { Formats } from '@d3-stencil/shared';

export const formatter = (
  type: FORMATS,
  data: number | string,
  currency: string = null
): string | number =>
  type === FORMATS.CURRENCY
    ? Formats[type](data, currency)
    : Formats[type](data);
