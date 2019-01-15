import { GraphData, GraphMeta } from './index';

export interface Graph {
  graphData: GraphData;
  graphDataMerged: GraphData;
  updateGraphData(graphData: GraphData): void;
  drawChart(): GraphMeta | void;
  hasData(): Error | boolean;
  reSetRoot(): void;
}
