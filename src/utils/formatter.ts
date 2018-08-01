import { Formats as FORMATS } from './../interfaces';
import { Formats } from './../shared';

export const formatter = (
  type: FORMATS,
  data: number | string,
  currency: string = null
): string | number =>
  type === FORMATS.CURRENCY
    ? Formats[type](data, currency)
    : Formats[type](data);
