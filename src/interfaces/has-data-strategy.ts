import { GraphData } from './../interfaces';

export type HasDataStrategy<T = number[][]> = (
  graphData: GraphData<T>,
  data?: T,
) => Error | boolean;
