import { GraphData } from './../interfaces';

export type HasDataStrategy = (
  graphData: GraphData,
  data?: any[],
) => Error | boolean;
