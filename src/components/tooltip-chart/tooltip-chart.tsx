import { Component, h, Prop, Element, Method } from '@stencil/core';
import { Selection, select } from 'd3-selection';
import { transition } from 'd3-transition';

@Component({
  tag: 'tooltip-chart',
  styleUrl: 'tooltip-chart.scss',
})
export class TooltipChart {
  @Prop() align: string = 'center';
  @Element() tooltipEl: HTMLElement;
  _tooltip: Selection<any, any, any, any>;

  @Method()
  async tooltip(tooltip: any): Promise<any> {
    this._tooltip = select(tooltip);
    this._tooltip.style('text-align', this.align);
  }

  @Method()
  async show(message: string, positions: number[]): Promise<any> {
    this._tooltip.transition(transition().duration(200)).style('opacity', 0.9);
    this._tooltip
      .html(message)
      .style('left', `${positions[0]}px`)
      .style('top', `${positions[1] - 38}px`);
  }

  @Method()
  async hide(): Promise<any> {
    this._tooltip.transition(transition().duration(500)).style('opacity', 0);
  }

  render() {
    return <div class="tooltip" />;
  }
}
