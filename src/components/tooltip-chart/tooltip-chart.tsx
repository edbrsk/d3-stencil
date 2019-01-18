import { Component, Element, Prop, Method } from '@stencil/core';
import { Selection, select } from 'd3-selection';
import { transition } from 'd3-transition';

@Component({
  tag: 'tooltip-chart',
  styleUrl: 'tooltip-chart.scss',
})
export class TooltipChart {
  @Prop() align: string = 'center';
  @Element() tooltipEl: HTMLElement;
  _tooltip: Selection<Element, any, any, any>;

  @Method()
  tooltip(tooltip: Element): void {
    this._tooltip = select(tooltip);
    this._tooltip.style('text-align', this.align);
  }

  @Method()
  show(message: string, positions: number[]): void {
    this._tooltip.transition(transition().duration(200)).style('opacity', 0.9);
    this._tooltip
      .html(message)
      .style('left', `${positions[0]}px`)
      .style('top', `${positions[1] - 38}px`);
  }

  @Method()
  hide(): void {
    this._tooltip.transition(transition().duration(500)).style('opacity', 0);
  }

  render() {
    return <div class="tooltip" />;
  }
}
