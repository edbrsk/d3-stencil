import { FormatsType } from './../formats';

export type PieChartOptions = Partial<{
  labelFormat: FormatsType;
  dataFormat: FormatsType;
  currency: string;
}>;
