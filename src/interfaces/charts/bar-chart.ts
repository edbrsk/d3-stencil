import { Axis, Margin } from './../options-types';

export interface BarChart {
  data: number[][];
  axis?: Axis;
  margin?: Margin;
}
