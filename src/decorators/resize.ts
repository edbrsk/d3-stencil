import { GraphMeta } from '@d3-stencil/interfaces';

const resize = (graph: { axisData: boolean } = { axisData: false }) => {
  const getAxisData = (
    graphMeta: GraphMeta<any[]>,
  ): { labels: string[] | number[]; range: number[] } => {
    if (graph.axisData) {
      const labels = getResponsiveLabels(graphMeta);

      return {
        labels,
        range: labels.map(
          (_, index: number) => index * (graphMeta.width / (labels.length - 1)),
        ),
      };
    }
  };

  const getResponsiveLabels = (
    graphMeta: GraphMeta<any[]>,
    margin: number = 70,
  ): any[] => {
    const separations = Math.floor(graphMeta.width / margin);

    const ticks =
      separations > graphMeta.graphData.labels.length
        ? 1
        : Math.ceil((graphMeta.graphData.labels.length - 1) / separations);

    const originalGraphLabels: any[] = graphMeta.graphData.labels;

    const labels = originalGraphLabels.filter(
      (_: string | number, index: number) => index === 0 || index % ticks === 0,
    );

    return labels.length <= 2
      ? [
          labels[0],
          graphMeta.graphData.labels[graphMeta.graphData.labels.length - 1],
        ]
      : labels;
  };

  return (
    _target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor,
  ) => {
    const originalMethod = descriptor.value;
    let graphMeta: GraphMeta<any[]>;
    let args: { labels: string[] | number[]; range: number[] };

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
