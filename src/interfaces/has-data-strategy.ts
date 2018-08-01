import { IGraphData } from './../interfaces';

export type HasDataStrategy = (graphDataMerged: IGraphData) => boolean | Error;
