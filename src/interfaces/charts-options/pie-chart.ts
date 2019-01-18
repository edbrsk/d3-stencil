import { Formats } from './../formats';

export type PieChart = Partial<{
  labelFormat: Formats;
  dataFormat: Formats;
  currency: string;
}>;
