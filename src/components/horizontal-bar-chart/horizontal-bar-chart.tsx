import { Component, Element, Prop, Method } from '@stencil/core';
import objectAssignDeep from 'object-assign-deep';
import { Selection, select, event } from 'd3-selection';
import { max } from 'd3-array';
import { ScaleBand, scaleBand, ScaleLinear, scaleLinear } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';
import { IGraph, IGraphData } from '@d3-stencil/interfaces';
import { Resize } from '@d3-stencil/decorators';
import {
  initTooltipIfExists,
  formatter,
  circularFind,
  initLegendIfExists,
} from '@d3-stencil/utils';
import { DEFAULT_GRAPH_DATA_BAR } from '@d3-stencil/shared';

@Component({
  tag: 'horizontal-bar-chart',
  styleUrl: 'horizontal-bar-chart.scss',
})
export class HorizontalBarChart implements IGraph {
  @Prop() graphData: IGraphData;
  @Element() horizontalBarChartEl: HTMLElement;
  graphDataMerged: IGraphData;
  svg: Selection<SVGElement, any, HTMLElement, any>;
  root: Selection<SVGElement, any, HTMLElement, any>;
  width: number;
  height: number;
  x: ScaleLinear<number, number>;
  y: ScaleBand<string>;
  tooltipEl: HTMLTooltipChartElement;
  legendEl: HTMLLegendChartElement;

  componentWillLoad() {
    this.graphDataMerged = objectAssignDeep(
      { ...DEFAULT_GRAPH_DATA_BAR },
      this.graphData,
    );
  }

  componentDidLoad() {
    this.svg = select(this.horizontalBarChartEl.getElementsByTagName('svg')[0]);

    this.height =
      this.svg.node().getBoundingClientRect().height -
      this.graphDataMerged.barChartOptions.margin.top -
      this.graphDataMerged.barChartOptions.margin.bottom;

    this.tooltipEl = initTooltipIfExists(this.horizontalBarChartEl);

    this.legendEl = initLegendIfExists(
      this.horizontalBarChartEl,
      this.eventsLegend.bind(this),
    );

    this.drawChart();
  }

  @Method()
  updateGraphData(graphData: IGraphData): void {
    this.graphDataMerged = objectAssignDeep(
      { ...DEFAULT_GRAPH_DATA_BAR },
      graphData,
    );

    this.drawChart();
  }

  @Resize()
  drawChart(): void {
    if (this.hasData()) {
      this.reSetRoot();

      this.width =
        this.svg.node().getBoundingClientRect().width -
        this.graphDataMerged.barChartOptions.margin.left -
        this.graphDataMerged.barChartOptions.margin.right;

      const originalGraphData: number[] = this.graphDataMerged.data[0];

      const maxValue = max<number, number>(originalGraphData, data => data);

      this.x = scaleLinear()
        .domain([0, Math.ceil(maxValue / 100) * 100])
        .range([0, this.width]);

      this.y = scaleBand()
        .domain(
          originalGraphData.map(
            (_, index): string => `${this.graphDataMerged.labels[index]}`,
          ),
        )
        .range([this.height, 0])
        .padding(0.1);

      this.drawAxis();
      this.drawGrid();
      this.drawBars();
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
      .attr(
        'transform',
        `translate(${this.graphDataMerged.barChartOptions.margin.left}, ${
          this.graphDataMerged.barChartOptions.margin.top
        })`,
      );
  }

  drawAxis(): void {
    if (this.graphDataMerged.barChartOptions.axis.x.visible) {
      this.root
        .append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(0, ${this.height})`)
        .call(
          axisBottom(this.x).tickFormat(domainValue =>
            formatter(
              this.graphDataMerged.barChartOptions.axis.x.format,
              domainValue,
              this.graphDataMerged.barChartOptions.axis.x.currency,
            ),
          ),
        );
    }

    if (this.graphDataMerged.barChartOptions.axis.y.visible) {
      this.root
        .append('g')
        .attr('class', 'y axis')
        .call(axisLeft(this.y));
    }
  }

  drawGrid(): void {
    if (this.graphDataMerged.barChartOptions.axis.x.gridVisible) {
      this.root
        .append('g')
        .attr('class', 'grid')
        .call(
          axisBottom(this.x)
            .tickSize(this.height)
            .tickFormat(() => ''),
        );
    }

    if (this.graphDataMerged.barChartOptions.axis.y.gridVisible) {
      this.root
        .append('g')
        .attr('class', 'grid')
        .call(
          axisLeft(this.y)
            .tickSize(-this.width)
            .tickFormat(() => ''),
        );
    }
  }

  drawBars(): void {
    this.root
      .append('g')
      .attr('class', 'bar-group')
      .selectAll('.bar')
      .data(this.graphDataMerged.data[0])
      .enter()
      .filter(data => this.x(data) > 0)
      .append('rect')
      .attr('class', 'bar')
      .attr('x', 0)
      .attr('height', this.y.bandwidth())
      .attr('y', (_, index) => this.y(`${this.graphDataMerged.labels[index]}`))
      .attr('width', data => this.x(data))
      .attr('fill', (_, index) =>
        circularFind(this.graphDataMerged.colors, index),
      )
      .on('mousemove', (data, index) =>
        this.eventsTooltip({ data, index, isToShow: true }),
      )
      .on('mouseout', () => this.eventsTooltip({ isToShow: false }));
  }

  eventsTooltip({
    data,
    index,
    isToShow,
  }: {
    data?: number;
    index?: number;
    isToShow: boolean;
  }): void {
    const toShow = () => {
      this.tooltipEl.show(
        `${formatter(
          this.graphDataMerged.barChartOptions.axis.x.format,
          data,
          this.graphDataMerged.barChartOptions.axis.x.currency,
        )} <br/> ${this.graphDataMerged.labels[index]}`,
        [event.pageX, event.pageY],
      );
    };

    const toHide = () => this.tooltipEl.hide();

    if (this.tooltipEl) {
      isToShow ? toShow() : toHide();
    }
  }

  eventsLegend(data: { label: string; index: number }) {
    /* tslint:disable-next-line no-console */
    console.log(data);
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
