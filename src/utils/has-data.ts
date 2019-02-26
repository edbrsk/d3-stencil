import { GraphData, HasData } from '@d3-stencil/interfaces';
import { BcgMatrix } from '@d3-stencil/interfaces/data-types';

const THROW_ERROR = (): Error => {
  throw new Error(`The data injected isn't valid.`);
};

export const hasDataIsNotempty: HasData<GraphData> = ({
  data,
  labels,
}): Error | boolean =>
  data.length > 0 && labels.length >= 1 ? true : THROW_ERROR();

export const hasDataValidOnAnnotationsChart: HasData<GraphData> = ({
  data,
  lineAnnotationsChart,
}): Error | boolean => {
  if (
    !(
      data.length > 0 &&
      lineAnnotationsChart.increaseHeight > 0 &&
      lineAnnotationsChart.tickSeparation !== '' &&
      lineAnnotationsChart.imagePathOneAnnotation !== '' &&
      lineAnnotationsChart.imagePathSomeAnnotations !== ''
    )
  ) {
    return THROW_ERROR();
  }

  return true;
};

export const hasDataBCGMatrixIsNotEmpty: HasData<GraphData<BcgMatrix[]>> = ({
  data,
}): Error | boolean => (data.length > 0 ? true : THROW_ERROR());
