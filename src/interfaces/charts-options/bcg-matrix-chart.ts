import { Axis, Margin } from './../options-types';
import { Formats } from './../formats';

export type BcgMatrixChart = {
  axis?: Axis;
  margin?: Margin;
  value?: {
    format?: Formats;
    currency?: string;
  };
  quadrants?: boolean;
};
