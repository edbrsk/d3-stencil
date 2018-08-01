import { IGraphData, IGraphMeta } from './index';

export interface IGraph {
  graphData: IGraphData;
  graphDataMerged: IGraphData;
  updateGraphData(graphData: IGraphData);
  drawChart(): IGraphMeta | void;
  hasData(): boolean | Error;
  reSetRoot(): void;
}
