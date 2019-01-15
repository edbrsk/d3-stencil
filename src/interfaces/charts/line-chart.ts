import { Axis, Margin } from './../options-types';

export interface LineChart {
  data: number[][];
  axis?: Axis;
  margin?: Margin;
}
