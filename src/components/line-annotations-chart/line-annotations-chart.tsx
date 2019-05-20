import { Component, h, Element, Prop, Method, Listen } from "@stencil/core";
import { Selection, select, event } from "d3-selection";
import { ScaleOrdinal, scaleOrdinal } from "d3-scale";
import { Resize } from "../../decorators";
import { objectAssignDeep } from "../../utils";
import { Graph, GraphData } from "../../interfaces";
import { DEFAULT_GRAPH_DATA_ANNOTATIONS_LINE } from "../../shared";

@Component({
  tag: "line-annotations-chart",
  styleUrl: "line-annotations-chart.scss"
})
export class LineAnnotationsChart implements Graph {
  @Prop() graphData: GraphData;
  @Element() lineAnnotationsChartEl: HTMLElement;
  graphDataMerged: GraphData;
  lineChartEl: HTMLLineChartElement;
  svg: Selection<any, any, HTMLLineChartElement, any>;
  root: Selection<any, any, HTMLLineChartElement, any>;
  x: ScaleOrdinal<number, number>;
  width: number;
  height: number;
  annotationsGroup: Selection<any, any, HTMLLineChartElement, any>;
  @Listen("lineChartRendered")
  lineChartRenderedHandle() {
    this.lineChartAreReady();
  }

  componentWillLoad() {
    this.graphDataMerged = objectAssignDeep(
      { ...DEFAULT_GRAPH_DATA_ANNOTATIONS_LINE },
      this.graphData
    );
  }

  @Method()
  updateGraphData(graphData: GraphData): void {
    this.graphDataMerged = objectAssignDeep(
      { ...DEFAULT_GRAPH_DATA_ANNOTATIONS_LINE },
      graphData
    );

    this.lineChartEl.updateGraphData(this.graphDataMerged);

    this.drawChart();
  }

  lineChartAreReady(): void {
    this.lineChartEl = this.lineAnnotationsChartEl.getElementsByTagName(
      "line-chart"
    )[0];

    this.svg = select(this.lineChartEl.getElementsByTagName("svg")[0]);

    this.height =
      this.svg.node().getBoundingClientRect().height -
      this.graphDataMerged.lineChart.margin.top -
      this.graphDataMerged.lineChart.margin.bottom;

    this.svg.style(
      "height",
      this.svg.node().getBoundingClientRect().height +
        this.graphDataMerged.lineAnnotationsChart.increaseHeight
    );

    this.drawChart();
  }

  @Resize()
  drawChart(): void {
    if (this.hasData()) {
      this.reSetRoot();

      this.width =
        this.svg.node().getBoundingClientRect().width -
        this.graphDataMerged.lineChart.margin.left -
        this.graphDataMerged.lineChart.margin.right;

      const originalGraphData = this.graphDataMerged.data;

      const allDataValues = originalGraphData.reduce(
        (acc: number[], data: number[]) => (acc = [...acc, ...data]),
        []
      );

      this.x = scaleOrdinal<number, number>()
        .domain(allDataValues)
        .range(
          allDataValues.map(
            (_, index) =>
              index * (this.width / (originalGraphData[0].length - 1))
          )
        );

      this.repositionXAxis();
      this.drawAnnotations();
    }
  }

  hasData(): Error | boolean {
    return this.graphDataMerged.hasData(this.graphDataMerged);
  }

  reSetRoot(): void {
    this.root = select(
      this.lineAnnotationsChartEl.getElementsByTagName("line-chart")[0]
        .children[0]
    );

    if (this.annotationsGroup) {
      this.annotationsGroup.remove();
    }
  }

  repositionXAxis(): void {
    this.root
      .selectAll(".x text")
      .attr("dy", this.graphDataMerged.lineAnnotationsChart.tickSeparation);

    this.root.selectAll(".x.axis-label").attr("dy", "1em");
  }

  drawAnnotations(): void {
    const range = this.x.range();

    this.annotationsGroup = this.root
      .select("g")
      .append("g")
      .attr("transform", `translate(0, ${this.height})`)
      .attr("class", "annotations-group");

    const annotations = this.root
      .select(".annotations-group")
      .selectAll(".annotation")
      .data(this.graphDataMerged.lineAnnotationsChart.annotations)
      .enter()
      .append("g")
      .attr("transform", (_, index) => `translate(${range[index]}, 0)`)
      .attr("class", "annotation")
      .attr("data", (_, index) => range[index]);

    annotations
      .filter((data: number[]) => data.length > 0)
      .append("svg:image")
      .attr("y", 7)
      .attr("x", -7)
      .attr("width", (data: number[]) => (data.length > 1 ? 20 : 17))
      .attr("height", (data: number[]) => (data.length > 1 ? 20 : 17))
      .attr("xlink:href", (data: number[]) =>
        data.length > 1
          ? this.graphDataMerged.lineAnnotationsChart.imagePathSomeAnnotations
          : this.graphDataMerged.lineAnnotationsChart.imagePathOneAnnotation
      )
      .on("mouseover", () => this.strokedashAnnotations(true))
      .on("mouseleave", () => this.strokedashAnnotations());
  }

  strokedashAnnotations(isMouseOver: boolean = false): void {
    const position = select(event.target).node().parentNode.attributes.data
      .nodeValue;

    const stylesGuideLineAnnotation = {
      style: ["style", "stroke: #0283B0; stroke-width: 3"],
      strokeDasharray: ["stroke-dasharray", "5,5"]
    };

    if (isMouseOver) {
      this.root
        .select(".grid[text-anchor~=middle]")
        .append("line")
        .attr("class", "strokedash")
        .attr("x1", position)
        .attr("y1", 0)
        .attr("x2", position)
        .attr("y2", this.height)
        .attr(
          stylesGuideLineAnnotation.style[0],
          stylesGuideLineAnnotation.style[1]
        )
        .attr(
          stylesGuideLineAnnotation.strokeDasharray[0],
          stylesGuideLineAnnotation.strokeDasharray[1]
        );
    } else {
      this.root.select(".strokedash").remove();
    }
  }

  render() {
    return <line-chart graphData={this.graphDataMerged} />;
  }
}
