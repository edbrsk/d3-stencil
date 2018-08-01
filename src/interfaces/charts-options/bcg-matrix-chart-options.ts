import { Axis, Margin } from './../options-types';
import { FormatsType } from './../formats';

export type BcgMatrixChartOptions = Partial<{
  axis: Axis;
  quadrants: boolean;
  value: Partial<{
    format: FormatsType;
    currency: string;
  }>;
  margin: Margin;
}>;
