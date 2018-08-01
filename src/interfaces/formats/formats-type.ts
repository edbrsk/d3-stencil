import { Formats } from './index';

export type FormatsType =
  | Formats.PERCENTAGE
  | Formats.GROUPED_TWO_DIGITS
  | Formats.GROUPED_THOUSANDS_TWO_DIGITS
  | Formats.CURRENCY
  | Formats.DAY_AND_MONTH
  | Formats.SHORT_MONTH
  | Formats.LARGE_MONTH
  | Formats.ANY;
