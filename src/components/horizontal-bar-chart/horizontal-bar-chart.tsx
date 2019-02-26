import { Component, Element, Prop, Method, State } from '@stencil/core';
import objectAssignDeep from 'object-assign-deep';
import { Selection, select, event } from 'd3-selection';
import { max } from 'd3-array';
import { ScaleBand, scaleBand, ScaleLinear, scaleLinear } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';
import { Graph, GraphData } from '@d3-stencil/interfaces';
import { Resize } from '@d3-stencil/decorators';
import {
  initTooltipIfExists,
  initLegendIfExists,
  formatter,
  circularFind,
} from '@d3-stencil/utils';
import { DEFAULT_GRAPH_DATA_BAR } from '@d3-stencil/shared';

@Component({
  tag: 'horizontal-bar-chart',
  styleUrl: 'horizontal-bar-chart.scss',
})
export class HorizontalBarChart implements Graph<number[]> {
  @Prop() graphData: GraphData<number[]>;
  @Element() horizontalBarChartEl: HTMLElement;
  graphDataMerged: GraphData<number[]>;
  svg: Selection<SVGElement, any, HTMLElement, any>;
  root: Selection<SVGElement, any, HTMLElement, any>;
  width: number;
  height: number;
  x: ScaleLinear<number, number>;
  y: ScaleBand<string>;
  @State() tooltipEl: HTMLTooltipChartElement;
  @State() legendEl: HTMLLegendChartElement;

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
      this.graphDataMerged.barChart.margin.top -
      this.graphDataMerged.barChart.margin.bottom;

    this.initSlots();
    this.drawChart();
  }

  @Method()
  updateGraphData(graphData: GraphData<number[]>): void {
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
        this.graphDataMerged.barChart.margin.left -
        this.graphDataMerged.barChart.margin.right;

      const originalGraphData: number[] = this.graphDataMerged.data;

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

  hasData(): Error | boolean {
    return this.graphDataMerged.hasData(this.graphDataMerged);
  }

  reSetRoot(): void {
    if (this.root) {
      this.root.remove();
    }

    this.root = this.svg
      .append('g')
      .attr(
        'transform',
        `translate(${this.graphDataMerged.barChart.margin.left}, ${
          this.graphDataMerged.barChart.margin.top
        })`,
      );
  }

  initSlots() {
    this.tooltipEl = initTooltipIfExists(this.horizontalBarChartEl);

    this.legendEl = initLegendIfExists(
      this.horizontalBarChartEl,
      this.eventsLegend.bind(this),
    );
  }

  drawAxis(): void {
    if (this.graphDataMerged.barChart.axis.x.visible) {
      this.root
        .append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(0, ${this.height})`)
        .call(
          axisBottom(this.x).tickFormat(domainValue =>
            formatter(
              this.graphDataMerged.barChart.axis.x.format,
              domainValue,
              this.graphDataMerged.barChart.axis.x.currency,
            ),
          ),
        );
    }

    if (this.graphDataMerged.barChart.axis.y.visible) {
      this.root
        .append('g')
        .attr('class', 'y axis')
        .call(axisLeft(this.y));
    }
  }

  drawGrid(): void {
    if (this.graphDataMerged.barChart.axis.x.gridVisible) {
      this.root
        .append('g')
        .attr('class', 'grid')
        .call(
          axisBottom(this.x)
            .tickSize(this.height)
            .tickFormat(() => ''),
        );
    }

    if (this.graphDataMerged.barChart.axis.y.gridVisible) {
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
      .data(this.graphDataMerged.data)
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
          this.graphDataMerged.barChart.axis.x.format,
          data,
          this.graphDataMerged.barChart.axis.x.currency,
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
      <div class={this.legendEl ? 'o-layout is--vertical' : 'o-layout'}>
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
