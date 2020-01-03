import { Data } from '@interfaces/data-types';
import { Styles } from '@interfaces/options-types';
import { HasData } from '@interfaces/has-data';
import {
  PieChart,
  BarChart,
  LineChart,
  LineAnnotationsChart,
  BcgMatrixChart,
} from '@interfaces/charts-options';

export type GraphData<T = number[][]> = Partial<{
  pieChart: PieChart;
  barChart: BarChart;
  lineChart: LineChart;
  lineAnnotationsChart: LineAnnotationsChart;
  bcgMatrixChart: BcgMatrixChart;
  styles: Styles;
  colors: string[];
  labels: string[] | number[];
  data: Data<T>;
  hasData: HasData;
}>;
