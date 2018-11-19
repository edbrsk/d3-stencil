import {
  Component,
  Element,
  Prop,
  Method,
  Event,
  EventEmitter,
} from '@stencil/core';
import objectAssignDeep from 'object-assign-deep';
import { select, event } from 'd3-selection';
import { max } from 'd3-array';
import { scaleOrdinal, scaleLinear } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';
import { line } from 'd3-shape';
import { IGraph, IGraphMeta, IGraphData } from '@d3-stencil/interfaces';
import { Resize } from '@d3-stencil/decorators';
import {
  initTooltipIfExists,
  initLegendIfExists,
  formatter,
  circularFind,
} from '@d3-stencil/utils';
import { DEFAULT_GRAPH_DATA_LINE } from '@d3-stencil/shared';

@Component({
  tag: 'line-chart',
  styleUrl: 'line-chart.scss',
})
export class LineChart implements IGraph {
  @Prop() graphData: IGraphData;
  @Element() lineChartEl: HTMLElement;
  @Event() lineChartRendered: EventEmitter;
  graphDataMerged: IGraphData;
  svg: any;
  root: any;
  line: any;
  data: any;
  width: number;
  height: number;
  x: any;
  y: any;
  tooltipEl: any;
  legendEl: any;

  componentWillLoad() {
    this.graphDataMerged = objectAssignDeep(
      { ...DEFAULT_GRAPH_DATA_LINE },
      this.graphData,
    );
  }

  componentDidLoad() {
    this.svg = select(this.lineChartEl.getElementsByClassName('line-chart')[0]);
    this.height =
      this.svg.node().getBoundingClientRect().height -
      this.graphDataMerged.lineChartOptions.margin.top -
      this.graphDataMerged.lineChartOptions.margin.bottom;
    this.tooltipEl = initTooltipIfExists(this.lineChartEl, 'tooltip').component;
    this.legendEl = initLegendIfExists(
      this.lineChartEl,
      'legend',
      this.eventsLegend.bind(this),
    ).component;
    this.drawChart();
    this.handleOnRenderized();
  }

  @Method()
  updateGraphData(graphData: IGraphData) {
    this.graphDataMerged = objectAssignDeep(
      { ...DEFAULT_GRAPH_DATA_LINE },
      graphData,
    );
    this.drawChart();
  }

  @Resize({
    axisData: true,
  })
  drawChart(
    axisXDataTruncated: { labels: string[]; range: number[] } = null,
  ): IGraphMeta {
    this.reSetRoot();
    this.width =
      this.svg.node().getBoundingClientRect().width -
      this.graphDataMerged.lineChartOptions.margin.left -
      this.graphDataMerged.lineChartOptions.margin.right;

    if (this.hasData() && axisXDataTruncated) {
      this.x = scaleOrdinal()
        .domain(axisXDataTruncated.labels)
        .range(axisXDataTruncated.range);

      const originalGraphData: any = this.graphDataMerged.data;
      const allDataValues = originalGraphData.reduce(
        (acc: number[], data: any[]) => [...acc, ...data],
        [],
      );

      this.y = scaleLinear()
        .domain([0, max(allDataValues, (data: number) => data)])
        .range([this.height, 0]);

      const axisXWithAllRange = scaleOrdinal()
        .domain(allDataValues)
        .range(
          allDataValues.map(
            (_, index: number) =>
              index * (this.width / (originalGraphData[0].length - 1)),
          ),
        );

      this.line = line()
        .x((_, index) => axisXWithAllRange(index))
        .y((data, _) => this.y(data));

      this.drawAxis();
      this.drawAxisLabels();
      this.drawGrid();
      this.drawLines();
      this.drawDots(axisXWithAllRange);
    }

    return {
      width: this.width,
      graphData: this.graphDataMerged,
    };
  }

  hasData(): boolean | Error {
    return this.graphDataMerged.hasDataMethod(this.graphDataMerged);
  }

  reSetRoot() {
    if (this.root) {
      this.root.remove();
    }

    this.root = this.svg
      .append('g')
      .attr(
        'transform',
        `translate(${this.graphDataMerged.lineChartOptions.margin.left}, ${
          this.graphDataMerged.lineChartOptions.margin.top
        })`,
      );
  }

  drawAxis() {
    if (this.graphDataMerged.lineChartOptions.axis.x.visible) {
      this.root
        .append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(0, ${this.height})`)
        .call(
          axisBottom(this.x).tickFormat((data: string | number) =>
            formatter(
              this.graphDataMerged.lineChartOptions.axis.x.format,
              data,
              this.graphDataMerged.lineChartOptions.axis.x.currency,
            ),
          ),
        );
    }

    if (this.graphDataMerged.lineChartOptions.axis.y.visible) {
      this.root
        .append('g')
        .attr('class', 'y axis')
        .call(
          axisLeft(this.y).tickFormat((data: string | number) =>
            formatter(
              this.graphDataMerged.lineChartOptions.axis.y.format,
              data,
              this.graphDataMerged.lineChartOptions.axis.y.currency,
            ),
          ),
        );
    }
  }

  drawAxisLabels() {
    if (this.graphDataMerged.lineChartOptions.axis.x.label !== '') {
      this.root
        .append('text')
        .attr('class', 'x axis-label')
        .attr(
          'transform',
          `translate(${this.width / 2}, ${this.height +
            this.graphDataMerged.lineChartOptions.margin.top * 2})`,
        )
        .text(this.graphData.lineChartOptions.axis.x.label);
    }

    if (this.graphDataMerged.lineChartOptions.axis.y.label !== '') {
      this.root
        .append('text')
        .attr('class', 'y axis-label')
        .attr('transform', `rotate(-90)`)
        .attr('y', 0 - this.graphDataMerged.lineChartOptions.margin.left)
        .attr('x', 0 - this.height / 2)
        .attr('dy', '1em')
        .text(this.graphData.lineChartOptions.axis.y.label);
    }
  }

  drawGrid() {
    if (this.graphDataMerged.lineChartOptions.axis.x.gridVisible) {
      this.root
        .append('g')
        .attr('class', 'grid')
        .call(
          axisBottom(this.x)
            .tickSize(this.height)
            .tickFormat(''),
        );
    }

    if (this.graphDataMerged.lineChartOptions.axis.y.gridVisible) {
      this.root
        .append('g')
        .attr('class', 'grid')
        .call(
          axisLeft(this.y)
            .tickSize(-this.width)
            .tickFormat(''),
        );
    }
  }

  drawLines() {
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
        circularFind(this.graphDataMerged.colors, index),
      )
      .attr('d', this.line);
  }

  drawDots(axisXWithAllRange) {
    this.root
      .selectAll('.line-group')
      .append('g')
      .attr('class', 'dots-group')
      .style('fill', (_, index) =>
        circularFind(this.graphDataMerged.colors, index),
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
        this.eventsTooltip({ data, index, isToShow: true }),
      )
      .on('mouseout', () => this.eventsTooltip({ isToShow: false }));
  }

  handleOnRenderized() {
    this.lineChartRendered.emit();
  }

  eventsTooltip({
    data,
    index,
    isToShow,
  }: {
    data?: string | number;
    index?: number;
    isToShow: boolean;
  }) {
    const toShow = () => {
      this.tooltipEl.show(
        `${formatter(
          this.graphDataMerged.lineChartOptions.axis.y.format,
          data,
          this.graphDataMerged.lineChartOptions.axis.y.currency,
        )} <br/> ${formatter(
          this.graphDataMerged.lineChartOptions.axis.x.format,
          this.graphDataMerged.labels[index],
          this.graphDataMerged.lineChartOptions.axis.x.currency,
        )}`,
        [event.pageX, event.pageY],
      );
    };

    const toHide = () => this.tooltipEl.hide();

    if (this.tooltipEl) {
      isToShow ? toShow() : toHide();
    }
  }

  eventsLegend(data: { label: string; index: number }) {
    const element = select(`.line-group-${data.index}`);
    element.classed(
      'line-group__inactive',
      !element.classed('line-group__inactive'),
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
