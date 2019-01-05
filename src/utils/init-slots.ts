export const initTooltipIfExists = (
  chartElement: HTMLElement,
  key: string = 'tooltip',
): HTMLTooltipChartElement => {
  const tooltip: { element: Element; component: HTMLTooltipChartElement } = {
    element: chartElement.getElementsByClassName(key)[0],
    component: null,
  };

  if (tooltip.element) {
    tooltip.component = chartElement.querySelector(`${key}-chart`);
    tooltip.component.tooltip(tooltip.element);
  }

  return tooltip.component;
};

export const initLegendIfExists = (
  chartElement: HTMLElement,
  callback: (data: { label: string; index: number }) => any,
  key: string = 'legend',
): HTMLLegendChartElement => {
  const legend: { element: Element; component: HTMLLegendChartElement } = {
    element: chartElement.getElementsByClassName(key)[0],
    component: null,
  };

  if (legend.element) {
    legend.component = chartElement.querySelector(`${key}-chart`);
    legend.component.callOnClick(callback);
  }

  return legend.component;
};
