import { Formats } from './../formats';

export type PieChartOptions = Partial<{
  labelFormat: Formats;
  dataFormat: Formats;
  currency: string;
}>;
