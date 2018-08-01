import { IGraphData, HasDataStrategy } from './../interfaces';

const THROW_ERROR = (): Error => {
  throw new Error(`The data injected isn't valid.`);
};

export const hasDataIsNotempty: HasDataStrategy = (
  graphDataMerged: IGraphData
): boolean | Error =>
  graphDataMerged.data.length > 0 && graphDataMerged.labels.length >= 1
    ? true
    : THROW_ERROR();

export const hasDataValidOnAnnotationsChart: HasDataStrategy = ({
  lineAnnotationsChartOptions
}: IGraphData): boolean | Error => {
  if (
    !(
      lineAnnotationsChartOptions.increaseHeight > 0 &&
      lineAnnotationsChartOptions.tickSeparation !== '' &&
      lineAnnotationsChartOptions.imagePathOneAnnotation !== '' &&
      lineAnnotationsChartOptions.imagePathSomeAnnotations !== ''
    )
  ) {
    return THROW_ERROR();
  }

  return true;
};

export const hasDataBCGMatrixIsNotEmpty: HasDataStrategy = (
  graphDataMerged: IGraphData
): boolean | Error => (graphDataMerged.data.length > 0 ? true : THROW_ERROR());
