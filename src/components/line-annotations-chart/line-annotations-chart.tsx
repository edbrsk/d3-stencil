import { Component, Element, Prop, Method, Listen } from '@stencil/core';
import objectAssignDeep from 'object-assign-deep';
import { select, event } from 'd3-selection';
import { scaleOrdinal } from 'd3-scale';
import { Resize } from '@d3-stencil/decorators';
import { IGraph, IGraphData } from '@d3-stencil/interfaces';
import { DEFAULT_GRAPH_DATA_LINE } from '@d3-stencil/shared';

@Component({
  tag: 'line-annotations-chart',
  styleUrl: 'line-annotations-chart.scss',
})
export class LineAnnotationsChart implements IGraph {
  @Prop() graphData: IGraphData;
  @Element() lineAnnotationsChartEl: HTMLElement;
  graphDataMerged: IGraphData;
  lineChartEl: any;
  svg: any;
  root: any;
  x: any;
  width: number;
  height: number;
  annotationsGroup: any;
  @Listen('lineChartRendered')
  lineChartRenderedHandle() {
    this.lineChartAreReady();
  }

  componentWillLoad() {
    this.graphDataMerged = objectAssignDeep(
      { ...DEFAULT_GRAPH_DATA_LINE },
      this.graphData,
    );
  }

  @Method()
  updateGraphData(graphData: IGraphData) {
    this.graphDataMerged = objectAssignDeep(
      { ...DEFAULT_GRAPH_DATA_LINE },
      graphData,
    );
    this.lineChartEl.updateGraphData(this.graphDataMerged);
    this.drawChart();
  }

  lineChartAreReady() {
    this.lineChartEl = this.lineAnnotationsChartEl.getElementsByTagName(
      'line-chart',
    )[0];
    this.svg = select(this.lineChartEl.getElementsByTagName('svg')[0]);
    this.height =
      this.svg.node().getBoundingClientRect().height -
      this.graphDataMerged.lineChartOptions.margin.top -
      this.graphDataMerged.lineChartOptions.margin.bottom;
    this.svg.style(
      'height',
      this.svg.node().getBoundingClientRect().height +
        this.graphDataMerged.lineAnnotationsChartOptions.increaseHeight,
    );
    this.drawChart();
  }

  @Resize()
  drawChart() {
    if (this.hasData()) {
      this.reSetRoot();
      this.width =
        this.svg.node().getBoundingClientRect().width -
        this.graphDataMerged.lineChartOptions.margin.left -
        this.graphDataMerged.lineChartOptions.margin.right;

      const originalGraphData: any = this.graphDataMerged.data;
      const allDataValues = originalGraphData.reduce(
        (acc: number[], data: any[]) => (acc = [...acc, ...data]),
        [],
      );

      this.x = scaleOrdinal()
        .domain(allDataValues)
        .range(
          allDataValues.map(
            (_, index) =>
              index * (this.width / (originalGraphData[0].length - 1)),
          ),
        );

      this.repositionXAxis();
      this.drawAnnotations();
    }
  }

  hasData(): boolean | Error {
    return this.graphDataMerged.lineAnnotationsChartOptions.hasDataMethod(
      this.graphDataMerged,
    );
  }

  reSetRoot() {
    this.root = select(
      this.lineAnnotationsChartEl.getElementsByTagName('line-chart')[0]
        .children[0],
    );

    if (this.annotationsGroup) {
      this.annotationsGroup.remove();
    }
  }

  repositionXAxis() {
    this.root
      .selectAll('.x text')
      .attr(
        'dy',
        this.graphDataMerged.lineAnnotationsChartOptions.tickSeparation,
      );

    this.root.selectAll('.x.axis-label').attr('dy', '1em');
  }

  drawAnnotations() {
    const range = this.x.range();

    this.annotationsGroup = this.root
      .select('g')
      .append('g')
      .attr('transform', `translate(0, ${this.height})`)
      .attr('class', 'annotations-group');

    const annotations = this.root
      .select('.annotations-group')
      .selectAll('.annotation')
      .data(this.graphDataMerged.lineAnnotationsChartOptions.annotations)
      .enter()
      .append('g')
      .attr('transform', (_, index) => `translate(${range[index]}, 0)`)
      .attr('class', 'annotation')
      .attr('data', (_, index) => range[index]);

    annotations
      .filter((data: number[]) => data.length > 0)
      .append('svg:image')
      .attr('y', 7)
      .attr('x', -7)
      .attr('width', data => (data.length > 1 ? 20 : 17))
      .attr('height', data => (data.length > 1 ? 20 : 17))
      .attr('xlink:href', data =>
        data.length > 1
          ? this.graphDataMerged.lineAnnotationsChartOptions
              .imagePathSomeAnnotations
          : this.graphDataMerged.lineAnnotationsChartOptions
              .imagePathSomeAnnotations,
      )
      .on('mouseover', () => this.strokedashAnnotations(true))
      .on('mouseleave', () => this.strokedashAnnotations(false));
  }

  strokedashAnnotations(isMouseOver: boolean = false) {
    const position = select(event.target).node().parentNode.attributes.data
      .nodeValue;
    const stylesGuideLineAnnotation = {
      style: ['style', 'stroke: #0283B0; stroke-width: 3'],
      strokeDasharray: ['stroke-dasharray', '5,5'],
    };

    if (isMouseOver) {
      this.root
        .select('.grid[text-anchor~=middle]')
        .append('line')
        .attr('class', 'strokedash')
        .attr('x1', position)
        .attr('y1', 0)
        .attr('x2', position)
        .attr('y2', this.height)
        .attr(
          stylesGuideLineAnnotation.style[0],
          stylesGuideLineAnnotation.style[1],
        )
        .attr(
          stylesGuideLineAnnotation.strokeDasharray[0],
          stylesGuideLineAnnotation.strokeDasharray[1],
        );
    } else {
      this.root.select('.strokedash').remove();
    }
  }

  render() {
    return <line-chart graphData={this.graphDataMerged} />;
  }
}
