import { GraphData, HasDataStrategy } from '@d3-stencil/interfaces';

const THROW_ERROR = (): Error => {
  throw new Error(`The data injected isn't valid.`);
};

export const hasDataIsNotempty: HasDataStrategy = (
  graphData: GraphData,
  data: any[],
): Error | boolean =>
  data.length > 0 && graphData.labels.length >= 1 ? true : THROW_ERROR();

export const hasDataValidOnAnnotationsChart: HasDataStrategy = (
  graphData: GraphData,
): Error | boolean => {
  if (
    !(
      graphData.lineChart.data.length > 0 &&
      graphData.lineAnnotationsChart.increaseHeight > 0 &&
      graphData.lineAnnotationsChart.tickSeparation !== '' &&
      graphData.lineAnnotationsChart.imagePathOneAnnotation !== '' &&
      graphData.lineAnnotationsChart.imagePathSomeAnnotations !== ''
    )
  ) {
    return THROW_ERROR();
  }

  return true;
};

export const hasDataBCGMatrixIsNotEmpty: HasDataStrategy = (
  graphData: GraphData,
): Error | boolean =>
  graphData.bcgMatrixChart.data.length > 0 ? true : THROW_ERROR();
