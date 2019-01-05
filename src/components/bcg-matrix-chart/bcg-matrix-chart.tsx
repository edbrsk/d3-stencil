/*
import { Component, Element, Prop, Method } from '@stencil/core';
import objectAssignDeep from 'object-assign-deep';
import { select, event } from 'd3-selection';
import { max } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';
import { pack, hierarchy } from 'd3-hierarchy';
import { IBcgMatrix } from '@d3-stencil/interfaces/data-types';
import { IGraph, IGraphData } from '@d3-stencil/interfaces';
import { Resize } from '@d3-stencil/decorators';
import {
  initTooltipIfExists,
  formatter,
  initLegendIfExists,
} from '@d3-stencil/utils';
import { DEFAULT_GRAPH_DATA_BCG } from '@d3-stencil/shared';

@Component({
  tag: 'bcg-matrix-chart',
  styleUrl: 'bcg-matrix-chart.scss',
})
export class BGCMatrixChart implements IGraph {
  @Prop() graphData: IGraphData;
  @Element() bgcMatrixChartEl: HTMLElement;
  graphDataMerged: IGraphData;
  svg: any;
  root: any;
  width: number;
  height: number;
  x: any;
  y: any;
  dataSet: { children: IBcgMatrix[] | any } = { children: [] };
  tooltipEl: any;
  legendEl: any;
  bubbleOptions = {
    padding: 20,
    height: 15,
    fontSize: 13,
    opacity: 0.8,
  };

  componentWillLoad() {
    this.graphDataMerged = objectAssignDeep(
      { ...DEFAULT_GRAPH_DATA_BCG },
      this.graphData,
    );
  }

  componentDidLoad() {
    this.svg = select(this.bgcMatrixChartEl.getElementsByTagName('svg')[0]);
    this.height =
      this.svg.node().getBoundingClientRect().height -
      this.graphDataMerged.bcgMatrixChartOption.margin.top -
      this.graphDataMerged.bcgMatrixChartOption.margin.bottom;
    this.tooltipEl = initTooltipIfExists(
      this.bgcMatrixChartEl,
      'tooltip',
    ).component;
    this.legendEl = initLegendIfExists(
      this.bgcMatrixChartEl,
      'legend',
      this.eventsLegend.bind(this),
    ).component;
    this.dataSet.children = this.graphDataMerged.data;
    this.drawChart();
  }

  @Method()
  updateGraphData(graphData: IGraphData) {
    this.graphDataMerged = objectAssignDeep(
      { ...DEFAULT_GRAPH_DATA_BCG },
      graphData,
    );
    this.drawChart();
  }

  @Resize()
  drawChart() {
    if (this.hasData()) {
      this.reSetRoot();
      this.width =
        this.svg.node().getBoundingClientRect().width -
        this.graphDataMerged.bcgMatrixChartOption.margin.left -
        this.graphDataMerged.bcgMatrixChartOption.margin.right;

      this.x = scaleLinear()
        .domain([
          0,
          Math.round(
            max(this.graphDataMerged.data, (data: IBcgMatrix) => data.x_data),
          ),
        ])
        .range([0, this.width]);

      this.y = scaleLinear()
        .domain([
          0,
          max(this.graphDataMerged.data, (data: IBcgMatrix) => data.y_data),
        ])
        .range([this.height, 0]);

      this.drawAxis();
      this.drawGrid();
      this.drawQuadrants();
      this.drawBubbles();
    }
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
        `translate(${this.graphDataMerged.bcgMatrixChartOption.margin.left}, ${
          this.graphDataMerged.bcgMatrixChartOption.margin.top
        })`,
      );
  }

  drawAxis() {
    if (this.graphDataMerged.bcgMatrixChartOption.axis.x.visible) {
      this.root
        .append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(0, ${this.height})`)
        .call(axisBottom(this.x));
    }

    if (this.graphDataMerged.bcgMatrixChartOption.axis.y.visible) {
      this.root
        .append('g')
        .attr('class', 'y axis')
        .call(
          axisLeft(this.y).tickFormat(data =>
            formatter(
              this.graphDataMerged.bcgMatrixChartOption.axis.y.format,
              data,
              this.graphDataMerged.bcgMatrixChartOption.axis.y.currency,
            ),
          ),
        );
    }
  }

  drawGrid() {
    if (this.graphDataMerged.bcgMatrixChartOption.axis.x.gridVisible) {
      this.root
        .append('g')
        .attr('class', 'grid')
        .call(
          axisBottom(this.x)
            .tickSize(this.height)
            .tickFormat(''),
        );
    }

    if (this.graphDataMerged.bcgMatrixChartOption.axis.y.gridVisible) {
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

  drawQuadrants() {
    if (this.graphDataMerged.bcgMatrixChartOption.quadrants) {
      const axisXDomain = this.x.domain();
      const axisYDomain = this.y.domain();

      const quadrant = this.root.append('g').attr('class', 'quadrants');

      quadrant
        .append('line')
        .attr('x1', () => this.x(axisXDomain[0]))
        .attr('x2', () => this.x(axisXDomain[1]))
        .attr('y1', () => this.y((axisYDomain[0] + axisYDomain[1]) / 2))
        .attr('y2', () => this.y((axisYDomain[0] + axisYDomain[1]) / 2));

      quadrant
        .append('line')
        .attr('x1', () => this.x((axisXDomain[0] + axisXDomain[1]) / 2))
        .attr('x2', () => this.x((axisXDomain[0] + axisXDomain[1]) / 2))
        .attr('y1', () => this.y(axisYDomain[0]))
        .attr('y2', () => this.y(axisYDomain[1]));
    }
  }

  drawBubbles() {
    const bubble = pack(this.dataSet)
      .size([
        this.width -
          (this.graphDataMerged.bcgMatrixChartOption.margin.left +
            this.graphDataMerged.bcgMatrixChartOption.margin.right) *
            2,
        this.height -
          (this.graphDataMerged.bcgMatrixChartOption.margin.top +
            this.graphDataMerged.bcgMatrixChartOption.margin.bottom) *
            2,
      ])
      .padding(1.5);

    const nodes = hierarchy(this.dataSet).sum(
      (data: IBcgMatrix) => data.rel_size,
    );

    const node = this.root
      .append('g')
      .attr('class', 'bubble-group')
      .selectAll('.bubble')
      .data(bubble(nodes).descendants())
      .enter()
      .filter(data => !data.children)
      .append('g')
      .attr('class', 'bubble')
      .on('mousemove', ({ data }) =>
        this.eventsTooltip({ data, isToShow: true }),
      )
      .on('mouseout', () => this.eventsTooltip({ isToShow: false }));

    node
      .filter(data => data.r > 0)
      .append('circle')
      .attr('cx', ({ data }: { data: IBcgMatrix }) => this.x(data.x_data))
      .attr('cy', ({ data }: { data: IBcgMatrix }) => this.y(data.y_data))
      .attr('r', data => data.r)
      .style('fill', ({ data }: { data: IBcgMatrix }) => data.color)
      .style('opacity', this.bubbleOptions.opacity);

    node
      .filter(data => data.r > 0)
      .append('rect')
      .attr('width', data => data.r * 2 + this.bubbleOptions.padding)
      .attr('height', this.bubbleOptions.height)
      .attr(
        'x',
        data =>
          this.x(data.data.x_data) - data.r - this.bubbleOptions.padding / 2,
      )
      .attr('y', data => this.y(data.data.y_data) - this.bubbleOptions.fontSize)
      .attr('stroke', ({ data }: { data: IBcgMatrix }) => data.color)
      .attr('stroke-width', 1)
      .attr('fill', '#FFFFFF');

    node
      .filter(data => data.r > 0)
      .append('text')
      .attr('dx', ({ data }: { data: IBcgMatrix }) => this.x(data.x_data))
      .attr('dy', ({ data }: { data: IBcgMatrix }) => this.y(data.y_data))
      .style('text-anchor', 'middle')
      .text(({ data }: { data: IBcgMatrix }) => data.label)
      .attr('font-size', this.bubbleOptions.fontSize)
      .attr('fill', '#000000');
  }

  eventsTooltip({ data, isToShow }: { data?: IBcgMatrix; isToShow: boolean }) {
    const toShow = () => {
      this.tooltipEl.show(`${data.tooltipInfo}`, [event.pageX, event.pageY]);
    };

    const toHide = () => this.tooltipEl.hide();

    if (this.tooltipEl) {
      isToShow ? toShow() : toHide();
    }
  }

  eventsLegend(data: { label: string; index: number }) {
    console.log(data);
  }

  render() {
    return (
      <div class="o-layout">
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
*/
