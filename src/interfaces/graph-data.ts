import { IBcgMatrix } from './data-types';
import { Styles } from './options-types';
import { HasDataStrategy } from './index';
import {
  PieChartOptions,
  BarChartOptions,
  LineChartOptions,
  ILineAnnotationsChartOptions,
  BcgMatrixChartOptions
} from './charts-options';

export interface IGraphData {
  data: number[][] | IBcgMatrix[];
  styles: Styles;
  hasDataMethod?: HasDataStrategy;
  labels?: string[] | number[];
  colors?: string[];
  pieChartOptions?: PieChartOptions;
  barChartOptions?: BarChartOptions;
  lineChartOptions?: LineChartOptions;
  lineAnnotationsChartOptions?: ILineAnnotationsChartOptions;
  bcgMatrixChartOption?: BcgMatrixChartOptions;
}
