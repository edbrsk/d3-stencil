import { Formats } from './../formats';

export interface PieChart {
  data: number[][];
  labelFormat?: Formats;
  dataFormat?: Formats;
  currency?: string;
}
