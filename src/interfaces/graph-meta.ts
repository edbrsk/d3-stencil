import { GraphData } from './index';

export interface GraphMeta<T = number[][]> {
  width: number;
  graphData: GraphData<T>;
}
