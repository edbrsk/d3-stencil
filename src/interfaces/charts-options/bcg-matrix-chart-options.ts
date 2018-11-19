import { Axis, Margin } from './../options-types';
import { Formats } from './../formats';

export type BcgMatrixChartOptions = Partial<{
  axis: Axis;
  quadrants: boolean;
  value: Partial<{
    format: Formats;
    currency: string;
  }>;
  margin: Margin;
}>;
