export const initTooltipIfExists = (
  chartElement: HTMLElement,
  key: string
): { element; component } => {
  const tooltip = {
    element: chartElement.getElementsByClassName(key)[0],
    component: null
  };

  if (tooltip.element) {
    tooltip.component = chartElement.querySelector(`${key}-chart`);
    tooltip.component.tooltip(tooltip.element);
  }

  return tooltip;
};

export const initLegendIfExists = (
  chartElement: HTMLElement,
  key: string,
  callback: () => any
): { element; component } => {
  const legend = {
    element: chartElement.getElementsByClassName(key)[0],
    component: null
  };

  if (legend.element) {
    legend.component = chartElement.querySelector(`${key}-chart`);
    legend.component.callOnClick(callback);
  }

  return legend;
};
