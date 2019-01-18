import { Axis, Margin } from './../options-types';
import { Formats } from './../formats';

export type BcgMatrixChart = Partial<{
  axis: Axis;
  quadrants: boolean;
  margin: Margin;
  value: Partial<{
    format: Formats;
    currency: string;
  }>;
}>;
