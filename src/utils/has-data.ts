import { GraphData, HasDataStrategy } from '@d3-stencil/interfaces';
import { BcgMatrix } from '@d3-stencil/interfaces/data-types';

const THROW_ERROR = (): Error => {
  throw new Error(`The data injected isn't valid.`);
};

export const hasDataIsNotempty: HasDataStrategy = (
  graphData: GraphData,
): Error | boolean =>
  graphData.data.length > 0 && graphData.labels.length >= 1
    ? true
    : THROW_ERROR();

export const hasDataValidOnAnnotationsChart: HasDataStrategy = (
  graphData: GraphData,
): Error | boolean => {
  if (
    !(
      graphData.data.length > 0 &&
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

export const hasDataBCGMatrixIsNotEmpty: HasDataStrategy<BcgMatrix[]> = (
  graphData: GraphData<BcgMatrix[]>,
): Error | boolean => (graphData.data.length > 0 ? true : THROW_ERROR());
