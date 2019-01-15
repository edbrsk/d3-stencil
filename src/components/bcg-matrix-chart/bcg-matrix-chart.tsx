import { Component, Element, Prop, Method } from '@stencil/core';
import objectAssignDeep from 'object-assign-deep';
import { Selection, select, event } from 'd3-selection';
import { max } from 'd3-array';
import { ScaleLinear, scaleLinear } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';
import { pack, hierarchy } from 'd3-hierarchy';
import { BcgMatrix } from '@d3-stencil/interfaces/data-types';
import { Graph, GraphData } from '@d3-stencil/interfaces';
import { Resize } from '@d3-stencil/decorators';
import {
  initTooltipIfExists,
  initLegendIfExists,
  formatter,
  circularFind,
} from '@d3-stencil/utils';
import { DEFAULT_GRAPH_DATA_BCG } from '@d3-stencil/shared';

@Component({
  tag: 'bcg-matrix-chart',
  styleUrl: 'bcg-matrix-chart.scss',
})
export class BGCMatrixChart implements Graph {
  @Prop() graphData: GraphData;
  @Element() bgcMatrixChartEl: HTMLElement;
  graphDataMerged: GraphData;
  svg: Selection<Element, any, HTMLElement, any>;
  root: Selection<SVGElement, any, HTMLElement, any>;
  width: number;
  height: number;
  x: ScaleLinear<number, number>;
  y: ScaleLinear<number, number>;
  dataSet: { children: BcgMatrix[] } = { children: [] };
  bubbleOptions = {
    padding: 20,
    height: 15,
    fontSize: 13,
    opacity: 0.8,
  };
  tooltipEl: HTMLTooltipChartElement;
  legendEl: HTMLLegendChartElement;

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
      this.graphDataMerged.bcgMatrixChart.margin.top -
      this.graphDataMerged.bcgMatrixChart.margin.bottom;

    this.tooltipEl = initTooltipIfExists(this.bgcMatrixChartEl);

    this.legendEl = initLegendIfExists(
      this.bgcMatrixChartEl,
      this.eventsLegend.bind(this),
    );

    this.dataSet.children = this.graphDataMerged.bcgMatrixChart.data;

    this.drawChart();
  }

  @Method()
  updateGraphData(graphData: GraphData) {
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
        this.graphDataMerged.bcgMatrixChart.margin.left -
        this.graphDataMerged.bcgMatrixChart.margin.right;

      this.x = scaleLinear()
        .domain([
          0,
          Math.round(
            max(
              this.graphDataMerged.bcgMatrixChart.data,
              (data: BcgMatrix) => data.x_data,
            ),
          ),
        ])
        .range([0, this.width]);

      this.y = scaleLinear()
        .domain([
          0,
          max(
            this.graphDataMerged.bcgMatrixChart.data,
            (data: BcgMatrix) => data.y_data,
          ),
        ])
        .range([this.height, 0]);

      this.drawAxis();
      this.drawGrid();
      this.drawQuadrants();
      this.drawBubbles();
    }
  }

  hasData(): Error | boolean {
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
        `translate(${this.graphDataMerged.bcgMatrixChart.margin.left}, ${
          this.graphDataMerged.bcgMatrixChart.margin.top
        })`,
      );
  }

  drawAxis() {
    if (this.graphDataMerged.bcgMatrixChart.axis.x.visible) {
      this.root
        .append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(0, ${this.height})`)
        .call(axisBottom(this.x));
    }

    if (this.graphDataMerged.bcgMatrixChart.axis.y.visible) {
      this.root
        .append('g')
        .attr('class', 'y axis')
        .call(
          axisLeft(this.y).tickFormat(data =>
            formatter(
              this.graphDataMerged.bcgMatrixChart.axis.y.format,
              data,
              this.graphDataMerged.bcgMatrixChart.axis.y.currency,
            ),
          ),
        );
    }
  }

  drawGrid() {
    if (this.graphDataMerged.bcgMatrixChart.axis.x.gridVisible) {
      this.root
        .append('g')
        .attr('class', 'grid')
        .call(
          axisBottom(this.x)
            .tickSize(this.height)
            .tickFormat(() => ''),
        );
    }

    if (this.graphDataMerged.bcgMatrixChart.axis.y.gridVisible) {
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

  drawQuadrants() {
    if (this.graphDataMerged.bcgMatrixChart.quadrants) {
      const axisXDomain: number[] = this.x.domain();
      const axisYDomain: number[] = this.y.domain();
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
    const bubble = pack()
      .size([
        this.width -
          (this.graphDataMerged.bcgMatrixChart.margin.left +
            this.graphDataMerged.bcgMatrixChart.margin.right) *
            2,
        this.height -
          (this.graphDataMerged.bcgMatrixChart.margin.top +
            this.graphDataMerged.bcgMatrixChart.margin.bottom) *
            2,
      ])
      .padding(1.5);

    const nodes = hierarchy<any>(this.dataSet).sum(
      (data: BcgMatrix) => data.rel_size,
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
      .attr('cx', ({ data }: any) => this.x(data.x_data))
      .attr('cy', ({ data }: any) => this.y(data.y_data))
      .attr('r', data => data.r)
      .style('fill', (_, index: number) =>
        circularFind(this.graphData.colors, index),
      )
      .style('opacity', this.bubbleOptions.opacity);

    node
      .filter(data => data.r > 0)
      .append('rect')
      .attr('width', data => data.r * 2 + this.bubbleOptions.padding)
      .attr('height', this.bubbleOptions.height)
      .attr(
        'x',
        (data: any) =>
          this.x(data.data.x_data) - data.r - this.bubbleOptions.padding / 2,
      )
      .attr(
        'y',
        (data: any) => this.y(data.data.y_data) - this.bubbleOptions.fontSize,
      )
      .attr('stroke', (_, index: number) =>
        circularFind(this.graphData.colors, index),
      )
      .attr('stroke-width', 1)
      .attr('fill', '#FFFFFF');

    node
      .filter(data => data.r > 0)
      .append('text')
      .attr('dx', ({ data }: any) => this.x(data.x_data))
      .attr('dy', ({ data }: any) => this.y(data.y_data))
      .style('text-anchor', 'middle')
      .text((_, index: number) => this.graphData.labels[index])
      .attr('font-size', this.bubbleOptions.fontSize)
      .attr('fill', '#000000');
  }

  eventsTooltip({ data, isToShow }: { data?: any; isToShow: boolean }) {
    const toShow = () => {
      this.tooltipEl.show(`${data.tooltipInfo}`, [event.pageX, event.pageY]);
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
