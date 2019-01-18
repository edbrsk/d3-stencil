import { Data } from './data-types';
import { Styles } from './options-types';
import { HasDataStrategy } from './index';
import {
  PieChart,
  BarChart,
  LineChart,
  LineAnnotationsChart,
  BcgMatrixChart,
} from './charts-options';

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
  hasDataMethod: HasDataStrategy<T>;
}>;
