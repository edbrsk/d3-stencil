import {
  Component,
  h,
  Element,
  Prop,
  Method,
  Event,
  EventEmitter
} from '@stencil/core';
import { Selection, select, event } from 'd3-selection';
import { max } from 'd3-array';
import { ScaleOrdinal, scaleOrdinal, ScaleLinear, scaleLinear } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';
import { Line, line } from 'd3-shape';
import { Graph, GraphMeta, GraphData } from '../../interfaces';
import { Resize } from '../../decorators';
import {
  initTooltipIfExists,
  initLegendIfExists,
  formatter,
  circularFind,
  objectAssignDeep
} from '../../utils';
import { DEFAULT_GRAPH_DATA_LINE } from '../../shared';

@Component({
  tag: 'line-chart',
  styleUrl: 'line-chart.scss'
})
export class LineChart implements Graph {
  @Prop() graphData: GraphData;
  @Element() lineChartEl: HTMLElement;
  @Event() lineChartRendered: EventEmitter;
  graphDataMerged: GraphData;
  svg: Selection<any, any, HTMLElement, any>;
  root: Selection<SVGElement, any, HTMLElement, any>;
  line: Line<number>;
  data: any;
  width: number;
  height: number;
  x: ScaleOrdinal<string, any>;
  y: ScaleLinear<number, number>;
  tooltipEl: HTMLTooltipChartElement;
  legendEl: HTMLLegendChartElement;

  componentWillLoad() {
    this.graphDataMerged = objectAssignDeep(
      { ...DEFAULT_GRAPH_DATA_LINE },
      this.graphData
    );
  }

  componentDidLoad() {
    this.svg = select(this.lineChartEl.getElementsByClassName('line-chart')[0]);

    this.height =
      this.svg.node().getBoundingClientRect().height -
      this.graphDataMerged.lineChart.margin.top -
      this.graphDataMerged.lineChart.margin.bottom;

    this.tooltipEl = initTooltipIfExists(this.lineChartEl);

    this.legendEl = initLegendIfExists(
      this.lineChartEl,
      this.eventsLegend.bind(this)
    );

    this.drawChart();
    this.handleOnRenderized();
  }

  @Method()
  updateGraphData(graphData: GraphData): void {
    this.graphDataMerged = objectAssignDeep(
      { ...DEFAULT_GRAPH_DATA_LINE },
      graphData
    );

    this.drawChart();
  }

  @Resize({
    axisData: true
  })
  drawChart(axisXDataTruncated?: {
    labels: string[];
    range: number[];
  }): GraphMeta {
    this.reSetRoot();

    this.width =
      this.svg.node().getBoundingClientRect().width -
      this.graphDataMerged.lineChart.margin.left -
      this.graphDataMerged.lineChart.margin.right;

    if (this.hasData() && axisXDataTruncated) {
      this.x = scaleOrdinal()
        .domain(axisXDataTruncated.labels)
        .range(axisXDataTruncated.range);

      const originalGraphData: number[][] = this.graphDataMerged.data;

      const allDataValues: number[] = originalGraphData.reduce(
        (acc: number[], data: number[]) => [...acc, ...data],
        []
      );

      this.y = scaleLinear<number, number>()
        .domain([0, max(allDataValues, (data: number) => data)])
        .range([this.height, 0]);

      const axisXWithAllRange = scaleOrdinal<number, number>()
        .domain(allDataValues)
        .range(
          allDataValues.map(
            (_, index: number) =>
              index * (this.width / (originalGraphData[0].length - 1))
          )
        );

      this.line = line<number>()
        .x((_, index) => axisXWithAllRange(index))
        .y(data => this.y(data));

      this.drawAxis();
      this.drawAxisLabels();
      this.drawGrid();
      this.drawLines();
      this.drawDots(axisXWithAllRange);
    }

    return {
      width: this.width,
      graphData: this.graphDataMerged
    };
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
        `translate(${this.graphDataMerged.lineChart.margin.left}, ${
        this.graphDataMerged.lineChart.margin.top
        })`
      );
  }

  drawAxis(): void {
    if (this.graphDataMerged.lineChart.axis.x.visible) {
      this.root
        .append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(0, ${this.height})`)
        .call(
          axisBottom(this.x).tickFormat(domainValue =>
            formatter(
              this.graphDataMerged.lineChart.axis.x.format,
              domainValue,
              this.graphDataMerged.lineChart.axis.x.currency
            )
          )
        );
    }

    if (this.graphDataMerged.lineChart.axis.y.visible) {
      this.root
        .append('g')
        .attr('class', 'y axis')
        .call(
          axisLeft(this.y).tickFormat(domainValue =>
            formatter(
              this.graphDataMerged.lineChart.axis.y.format,
              domainValue,
              this.graphDataMerged.lineChart.axis.y.currency
            )
          )
        );
    }
  }

  drawAxisLabels(): void {
    if (this.graphDataMerged.lineChart.axis.x.label !== '') {
      this.root
        .append('text')
        .attr('class', 'x axis-label')
        .attr(
          'transform',
          `translate(${this.width / 2}, ${this.height +
          this.graphDataMerged.lineChart.margin.top * 2})`
        )
        .text(this.graphData.lineChart.axis.x.label);
    }

    if (this.graphDataMerged.lineChart.axis.y.label !== '') {
      this.root
        .append('text')
        .attr('class', 'y axis-label')
        .attr('transform', `rotate(-90)`)
        .attr('y', 0 - this.graphDataMerged.lineChart.margin.left)
        .attr('x', 0 - this.height / 2)
        .attr('dy', '1em')
        .text(this.graphData.lineChart.axis.y.label);
    }
  }

  drawGrid(): void {
    if (this.graphDataMerged.lineChart.axis.x.gridVisible) {
      this.root
        .append('g')
        .attr('class', 'grid')
        .call(
          axisBottom(this.x)
            .tickSize(this.height)
            .tickFormat(() => '')
        );
    }

    if (this.graphDataMerged.lineChart.axis.y.gridVisible) {
      this.root
        .append('g')
        .attr('class', 'grid')
        .call(
          axisLeft(this.y)
            .tickSize(-this.width)
            .tickFormat(() => '')
        );
    }
  }

  drawLines(): void {
    this.root
      .append('g')
      .attr('class', 'lines')
      .selectAll('.line-group')
      .data(this.graphDataMerged.data)
      .enter()
      .append('g')
      .attr('class', (_, index) => `line-group line-group-${index}`)
      .append('path')
      .attr('class', 'line')
      .style('stroke', (_, index) =>
        circularFind(this.graphDataMerged.colors, index)
      )
      .attr('d', this.line);
  }

  drawDots(axisXWithAllRange: ScaleOrdinal<number, number>): void {
    this.root
      .selectAll('.line-group')
      .append('g')
      .attr('class', 'dots-group')
      .style('fill', (_, index) =>
        circularFind(this.graphDataMerged.colors, index)
      )
      .selectAll('.dots-group')
      .data((_, index) => this.graphDataMerged.data[index])
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('cx', (_, index) => axisXWithAllRange(index))
      .attr('cy', data => this.y(data))
      .attr('r', 5)
      .on('mouseover', (data, index) =>
        this.eventsTooltip({ data, index, isToShow: true })
      )
      .on('mouseout', () => this.eventsTooltip({ isToShow: false }));
  }

  handleOnRenderized(): void {
    this.lineChartRendered.emit();
  }

  eventsTooltip({
    data,
    index,
    isToShow
  }: {
    data?: string | number;
    index?: number;
    isToShow: boolean;
  }) {
    const toShow = (): void => {
      this.tooltipEl.show(
        `${formatter(
          this.graphDataMerged.lineChart.axis.y.format,
          data,
          this.graphDataMerged.lineChart.axis.y.currency
        )} <br/> ${formatter(
          this.graphDataMerged.lineChart.axis.x.format,
          this.graphDataMerged.labels[index],
          this.graphDataMerged.lineChart.axis.x.currency
        )}`,
        [event.pageX, event.pageY]
      );
    };

    const toHide = (): any => this.tooltipEl.hide();

    if (this.tooltipEl) {
      isToShow ? toShow() : toHide();
    }
  }

  eventsLegend(data: { label: string; index: number }) {
    const element = select(`.line-group-${data.index}`);

    element.classed(
      'line-group__inactive',
      !element.classed('line-group__inactive')
    );
  }

  render() {
    return (
      <div class="o-layout">
        <div class="o-layout--chart">
          <svg style={this.graphDataMerged.styles} class="line-chart" />
        </div>
        <div class="o-layout--slot">
          <slot name="tooltip" />
          <slot name="legend" />
        </div>
      </div>
    );
  }
}
