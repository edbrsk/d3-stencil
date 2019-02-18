import { GraphData } from './index';

export type GraphMeta<T = number[][]> = {
  width: number;
  graphData: GraphData<T>;
};
