import { Component, h, Element, Prop, Method } from '@stencil/core';
import { Selection, select, event } from 'd3-selection';
import { LegendData } from '../../interfaces';
import { objectAssignDeep, circularFind } from '../../utils';
import { DEFAULT_LEGEND_DATA } from '../../shared';

@Component({
  tag: 'legend-chart',
  styleUrl: 'legend-chart.scss',
})
export class LegendChart {
  @Prop() legendData: LegendData;
  @Element() legendEl: HTMLElement;
  svg: Selection<any, any, HTMLElement, any>;
  legendDataMerged: LegendData;
  labelLegendPosition: number = 0;
  _callOnClick: (data: { label: string; index: number }) => any;

  componentWillLoad() {
    this.legendDataMerged = objectAssignDeep(
      { ...DEFAULT_LEGEND_DATA },
      this.legendData,
    );
  }

  componentDidLoad() {
    this.svg = select(this.legendEl.getElementsByTagName('svg')[0]);

    this.legendDataMerged.type === 'horizontal'
      ? this.drawHorizontalLegend()
      : this.drawVerticalLegend();
  }

  @Method() async callOnClick(callOnClickChild: (data: { label: string; index: number }) => any, ): Promise<any> {
    this._callOnClick = callOnClickChild;
  }

  drawHorizontalLegend(): void {
    const horizontalLegendGroup = this.svg
      .selectAll('.legend')
      .data(this.legendDataMerged.labels)
      .enter()
      .append('g')
      .attr('class', 'legend');

    horizontalLegendGroup
      .append('circle')
      .attr('cx', 10)
      .attr('cy', 5)
      .attr('r', 7)
      .style('fill', (_, index) =>
        circularFind(this.legendDataMerged.colors, index),
      )
      .style('stroke', (_, index) =>
        circularFind(this.legendDataMerged.colors, index),
      )
      .on('click', (data: string, index: number) =>
        this.handleOnClick(data, index),
      );

    horizontalLegendGroup
      .append('text')
      .attr('x', 20)
      .attr('y', 10)
      .text(data => data);

    horizontalLegendGroup.attr('transform', (_, index) =>
      this.makeTransformTranslate(horizontalLegendGroup, index),
    );
  }

  drawVerticalLegend(offset: number = 20): void {
    const legend = this.svg
      .selectAll('.legend')
      .data(this.legendDataMerged.labels)
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr(
        'transform',
        (_, index: number) => `translate(0, ${index * offset})`,
      );

    legend
      .append('circle')
      .attr('cx', 10)
      .attr('cy', 10)
      .attr('r', 7)
      .style('fill', (_, index: number) =>
        circularFind(this.legendDataMerged.colors, index),
      )
      .style('stroke', (_, index) =>
        circularFind(this.legendDataMerged.colors, index),
      )
      .on('click', (data: string, index: number) =>
        this.handleOnClick(data, index),
      );

    legend
      .append('text')
      .attr('x', 20)
      .attr('y', 15)
      .text((data: string) => data);
  }

  makeTransformTranslate(
    group: Selection<SVGGElement, string, Element, any>,
    index: number,
    offset: number = 20,
  ): string {
    const TY: number = 5;
    let TX: number = 0;

    if (index === 0) {
      this.labelLegendPosition = group.nodes()[index].getBBox().width + offset;
    } else {
      TX = this.labelLegendPosition;

      this.labelLegendPosition += group.nodes()[index].getBBox().width + offset;
    }

    return `translate(${TX}, ${TY})`;
  }

  handleOnClick(label: string, index: number): () => any {
    const circleElement = select(event.target);
    const textElement = select(event.target.nextSibling);

    circleElement.classed('is__inactive', !textElement.classed('is__inactive'));

    textElement.classed('is__inactive', !textElement.classed('is__inactive'));

    return this._callOnClick({ label, index });
  }

  render() {
    return <svg class="legend" style={this.legendDataMerged.styles} />;
  }
}
