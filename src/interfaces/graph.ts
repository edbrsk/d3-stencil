import { GraphData } from './graph-data';
import { GraphMeta } from './graph-meta';

export interface Graph<T = number[][]> {
  graphData: GraphData<T>;
  graphDataMerged: GraphData<T>;
  updateGraphData(newGraphData: GraphData<T>): void;
  drawChart(): GraphMeta<T> | void;
  hasData(): Error | boolean;
  reSetRoot(): void;
}
