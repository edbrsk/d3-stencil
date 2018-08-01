import { HasDataStrategy } from './../index';

export interface ILineAnnotationsChartOptions {
  increaseHeight: number;
  tickSeparation: string;
  annotations: number[][];
  imagePathOneAnnotation?: string;
  imagePathSomeAnnotations?: string;
  hasDataMethod?: HasDataStrategy;
}
