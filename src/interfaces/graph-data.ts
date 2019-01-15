import { Styles } from './options-types';
import { HasDataStrategy } from './index';
import {
  PieChart,
  BarChart,
  LineChart,
  LineAnnotationsChart,
  BcgMatrixChart,
} from './charts';

export type GraphData = Partial<{
  styles: Styles;
  pieChart: PieChart;
  barChart: BarChart;
  lineChart: LineChart;
  lineAnnotationsChart: LineAnnotationsChart;
  bcgMatrixChart: BcgMatrixChart;
  labels: string[] | number[];
  colors: string[];
  hasDataMethod: HasDataStrategy;
}>;
