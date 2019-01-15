import { BcgMatrix } from './../data-types';
import { Axis, Margin } from './../options-types';
import { Formats } from './../formats';

export interface BcgMatrixChart {
  data: BcgMatrix[];
  axis?: Axis;
  quadrants?: boolean;
  margin?: Margin;
  value: Partial<{
    format: Formats;
    currency: string;
  }>;
}
