import { IGraphMeta } from './../interfaces';

const resize = (graph: { axisData: boolean } = { axisData: false }) => {
  const getAxisData = (
    graphMeta: IGraphMeta
  ): { labels: any[]; range: any[] } | null => {
    if (graph.axisData) {
      const labels = getResponsiveLabels(graphMeta);

      return {
        labels,
        range: labels.map(
          (_, index: number) => index * (graphMeta.width / (labels.length - 1))
        )
      };
    }

    return null;
  };

  const getResponsiveLabels = (
    graphMeta: IGraphMeta,
    margin: number = 70
  ): any[] => {
    const separations: number = Math.floor(graphMeta.width / margin);
    const ticks: number =
      separations > graphMeta.graphData.labels.length
        ? 1
        : Math.ceil((graphMeta.graphData.labels.length - 1) / separations);
    const originalGraphLabels: any = graphMeta.graphData.labels;
    const labels: any[] = originalGraphLabels.filter(
      (_, index: number) => index === 0 || index % ticks === 0
    );

    return labels.length <= 2
      ? [
          labels[0],
          graphMeta.graphData.labels[graphMeta.graphData.labels.length - 1]
        ]
      : labels;
  };

  return (
    _target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ) => {
    const originalMethod: any = descriptor.value;
    let graphMeta: IGraphMeta;
    let args: any;

    descriptor.value = function() {
      graphMeta = originalMethod.apply(this);
      args = getAxisData(graphMeta);

      if (args) {
        originalMethod.apply(this, [args]);
      }

      const onResize = () => {
        graphMeta = originalMethod.apply(this);
        args = getAxisData(graphMeta);
        originalMethod.apply(this, [args]);
      };

      window.addEventListener('resize', onResize);
    };

    return descriptor;
  };
};

export { resize as Resize };
