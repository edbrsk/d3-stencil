import { GraphData, GraphMeta } from './index';

export interface Graph<T = number[][]> {
  graphData: GraphData<T>;
  graphDataMerged: GraphData<T>;
  updateGraphData(graphData: GraphData<T>): void;
  drawChart(): GraphMeta<T> | void;
  hasData(): Error | boolean;
  reSetRoot(): void;
}
