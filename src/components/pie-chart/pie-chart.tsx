import { Component, Element, Prop, Method } from '@stencil/core';
import objectAssignDeep from 'object-assign-deep';
import { Selection, select, event } from 'd3-selection';
import { Arc, arc, PieArcDatum, pie } from 'd3-shape';
import { IGraph, IGraphData } from '@d3-stencil/interfaces';
import { Resize } from '@d3-stencil/decorators';
import {
  initTooltipIfExists,
  initLegendIfExists,
  formatter,
  circularFind,
} from '@d3-stencil/utils';
import { DEFAULT_GRAPH_DATA_PIE } from '@d3-stencil/shared';

@Component({
  tag: 'pie-chart',
  styleUrl: 'pie-chart.scss',
})
export class PieChart implements IGraph {
  @Prop() graphData: IGraphData;
  @Element() pieChartEl: HTMLElement;
  graphDataMerged: IGraphData;
  svg: Selection<SVGElement, any, HTMLElement, any>;
  root: Selection<SVGElement, any, HTMLElement, any>;
  width: number;
  height: number;
  radius: number;
  labelArc: Arc<this, any>;
  pie: Selection<
    SVGGElement,
    PieArcDatum<number | { valueOf(): number }>,
    SVGElement,
    {}
  >;
  tooltipEl: HTMLTooltipChartElement;
  legendEl: HTMLLegendChartElement;

  componentWillLoad(): void {
    this.graphDataMerged = objectAssignDeep(
      { ...DEFAULT_GRAPH_DATA_PIE },
      this.graphData,
    );
  }

  componentDidLoad(): void {
    this.svg = select<SVGElement, any>(
      this.pieChartEl.getElementsByTagName('svg')[0],
    );
    this.height = this.svg.node().getBoundingClientRect().height;
    this.tooltipEl = initTooltipIfExists(this.pieChartEl);
    this.legendEl = initLegendIfExists(
      this.pieChartEl,
      this.eventsLegend.bind(this),
    );

    this.drawChart();
  }

  @Method()
  updateGraphData(graphData: IGraphData): void {
    this.graphDataMerged = objectAssignDeep(
      { ...DEFAULT_GRAPH_DATA_PIE },
      graphData,
    );

    this.drawChart();
  }

  @Resize()
  drawChart(): void {
    if (this.hasData()) {
      this.width = this.svg.node().getBoundingClientRect().width;
      this.radius = Math.min(this.width, this.height) / 2;

      this.reSetRoot();

      const circularArc = arc<
        SVGPathElement,
        PieArcDatum<number | { valueOf(): number }>
      >()
        .innerRadius(0)
        .outerRadius(this.radius);

      this.pie = this.root
        .selectAll('.arc')
        .data(
          pie()
            .sort(null)
            .value((data: number) => data)(this.graphDataMerged.data[0]),
        )
        .enter()
        .append('g')
        .attr('class', 'arc');

      this.pie
        .append('path')
        .attr('d', circularArc)
        .attr('stroke', '#FFF')
        .attr('fill', (_, index: number) =>
          circularFind(this.graphDataMerged.colors, index),
        )
        .on('mousemove', (data: PieArcDatum<number | { valueOf(): number }>) =>
          this.eventsTooltip({ data, isToShow: true }),
        )
        .on('mouseout', () => this.eventsTooltip({ isToShow: false }));

      this.createLabels();
    }
  }

  hasData(): boolean | Error {
    return this.graphDataMerged.hasDataMethod(this.graphDataMerged);
  }

  reSetRoot(): void {
    if (this.root) {
      this.root.remove();
    }

    this.root = this.svg
      .append('g')
      .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`);
  }

  createLabels(): void {
    this.labelArc = arc()
      .innerRadius(this.radius - 40)
      .outerRadius(this.radius - 40);

    this.pie
      .append('text')
      .attr('transform', data => `translate(${this.labelArc.centroid(data)})`)
      .attr('dy', '0.35em')
      .text((_, index: number) =>
        formatter(
          this.graphDataMerged.pieChartOptions.labelFormat,
          this.graphDataMerged.labels[index],
          this.graphDataMerged.pieChartOptions.currency,
        ),
      );
  }

  eventsTooltip({
    data,
    isToShow,
  }: {
    data?: { data: any; index: number };
    isToShow: boolean;
  }): void {
    const toShow = (): void => {
      this.tooltipEl.show(
        `${formatter(
          this.graphDataMerged.pieChartOptions.dataFormat,
          data.data,
          this.graphDataMerged.pieChartOptions.currency,
        )} <br/>
        ${formatter(
          this.graphDataMerged.pieChartOptions.labelFormat,
          this.graphDataMerged.labels[data.index],
          this.graphDataMerged.pieChartOptions.currency,
        )}`,
        [event.pageX, event.pageY],
      );
    };

    const toHide = (): void => this.tooltipEl.hide();

    if (this.tooltipEl) {
      isToShow ? toShow() : toHide();
    }
  }

  eventsLegend(data: { label: string | number; index: number }): void {
    const currentLabels: any[] = this.graphDataMerged.labels;
    const currentData = this.graphDataMerged.data[0];
    const tempLabels = currentLabels.filter(label => label !== data.label);
    const tempData = currentData.filter((_, index) => index !== data.index);

    if (currentLabels.length === tempLabels.length) {
      this.graphDataMerged.labels = this.graphData.labels;
      this.graphDataMerged.data = this.graphData.data;
      this.graphDataMerged.colors = this.graphData.colors;

      this.updateGraphData(this.graphDataMerged);
    } else {
      this.graphDataMerged.labels = tempLabels;
      this.graphDataMerged.data[0] = tempData;
      this.graphDataMerged.colors.splice(data.index, 1);

      this.updateGraphData(this.graphDataMerged);
    }
  }

  render() {
    return (
      <div class="o-layout is--vertical">
        <div class="o-layout--chart">
          <svg style={this.graphDataMerged.styles} />
        </div>
        <div class="o-layout--slot">
          <slot name="tooltip" />
          <slot name="legend" />
        </div>
      </div>
    );
  }
}
