/*! Built with http://stenciljs.com */
const { h } = window.D3Stencil;

import { a as objectAssignDeep, b as select, c as event, d as max, e as scaleOrdinal, f as scaleLinear, g as axisBottom, h as axisLeft, i as line, j as resize, k as initTooltipIfExists, l as initLegendIfExists, m as formatter, n as circularFind, o as DEFAULT_GRAPH_DATA_LINE } from './chunk-b53f2ffd.js';

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
class LineChart {
    componentWillLoad() {
        this.graphDataMerged = objectAssignDeep(Object.assign({}, DEFAULT_GRAPH_DATA_LINE), this.graphData);
    }
    componentDidLoad() {
        this.svg = select(this.lineChartEl.getElementsByClassName('line-chart')[0]);
        this.height =
            this.svg.node().getBoundingClientRect().height -
                this.graphDataMerged.lineChartOptions.margin.top -
                this.graphDataMerged.lineChartOptions.margin.bottom;
        this.tooltipEl = initTooltipIfExists(this.lineChartEl, 'tooltip').component;
        this.legendEl = initLegendIfExists(this.lineChartEl, 'legend', this.eventsLegend.bind(this)).component;
        this.drawChart();
        this.handleOnRenderized();
    }
    updateGraphData(graphData) {
        this.graphDataMerged = objectAssignDeep(Object.assign({}, DEFAULT_GRAPH_DATA_LINE), graphData);
        this.drawChart();
    }
    drawChart(axisXDataTruncated = null) {
        this.reSetRoot();
        this.width =
            this.svg.node().getBoundingClientRect().width -
                this.graphDataMerged.lineChartOptions.margin.left -
                this.graphDataMerged.lineChartOptions.margin.right;
        if (this.hasData() && axisXDataTruncated) {
            this.x = scaleOrdinal()
                .domain(axisXDataTruncated.labels)
                .range(axisXDataTruncated.range);
            const originalGraphData = this.graphDataMerged.data;
            const allDataValues = originalGraphData.reduce((acc, data) => (acc = [...acc, ...data]), []);
            this.y = scaleLinear()
                .domain([0, max(allDataValues, data => data)])
                .range([this.height, 0]);
            const axisXWithAllRange = scaleOrdinal()
                .domain(allDataValues)
                .range(allDataValues.map((_, index) => index * (this.width / (originalGraphData[0].length - 1))));
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
            graphData: this.graphDataMerged
        };
    }
    hasData() {
        return this.graphDataMerged.hasDataMethod(this.graphDataMerged);
    }
    reSetRoot() {
        if (this.root) {
            this.root.remove();
        }
        this.root = this.svg
            .append('g')
            .attr('transform', `translate(${this.graphDataMerged.lineChartOptions.margin.left}, ${this.graphDataMerged.lineChartOptions.margin.top})`);
    }
    drawAxis() {
        if (this.graphDataMerged.lineChartOptions.axis.x.visible) {
            this.root
                .append('g')
                .attr('class', 'x axis')
                .attr('transform', `translate(0, ${this.height})`)
                .call(axisBottom(this.x).tickFormat((data) => formatter(this.graphDataMerged.lineChartOptions.axis.x.format, data, this.graphDataMerged.lineChartOptions.axis.x.currency)));
        }
        if (this.graphDataMerged.lineChartOptions.axis.y.visible) {
            this.root
                .append('g')
                .attr('class', 'y axis')
                .call(axisLeft(this.y).tickFormat((data) => formatter(this.graphDataMerged.lineChartOptions.axis.y.format, data, this.graphDataMerged.lineChartOptions.axis.y.currency)));
        }
    }
    drawAxisLabels() {
        if (this.graphDataMerged.lineChartOptions.axis.x.label !== '') {
            this.root
                .append('text')
                .attr('class', 'x axis-label')
                .attr('transform', `translate(${this.width / 2}, ${this.height +
                this.graphDataMerged.lineChartOptions.margin.top * 2})`)
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
                .call(axisBottom(this.x)
                .tickSize(this.height)
                .tickFormat(''));
        }
        if (this.graphDataMerged.lineChartOptions.axis.y.gridVisible) {
            this.root
                .append('g')
                .attr('class', 'grid')
                .call(axisLeft(this.y)
                .tickSize(-this.width)
                .tickFormat(''));
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
            .style('stroke', (_, index) => circularFind(this.graphDataMerged.colors, index))
            .attr('d', this.line);
    }
    drawDots(axisXWithAllRange) {
        this.root
            .selectAll('.line-group')
            .append('g')
            .attr('class', 'dots-group')
            .style('fill', (_, index) => circularFind(this.graphDataMerged.colors, index))
            .selectAll('.dots-group')
            .data((_, index) => this.graphDataMerged.data[index])
            .enter()
            .append('circle')
            .attr('class', 'dot')
            .attr('cx', (_, index) => axisXWithAllRange(index))
            .attr('cy', data => this.y(data))
            .attr('r', 5)
            .on('mouseover', (data, index) => this.eventsTooltip({ data, index, isToShow: true }))
            .on('mouseout', () => this.eventsTooltip({ isToShow: false }));
    }
    handleOnRenderized() {
        this.lineChartRendered.emit();
    }
    eventsTooltip({ data, index, isToShow }) {
        const toShow = () => {
            this.tooltipEl.show(`${formatter(this.graphDataMerged.lineChartOptions.axis.y.format, data, this.graphDataMerged.lineChartOptions.axis.y.currency)} <br/> ${formatter(this.graphDataMerged.lineChartOptions.axis.x.format, this.graphDataMerged.labels[index], this.graphDataMerged.lineChartOptions.axis.x.currency)}`, [event.pageX, event.pageY]);
        };
        const toHide = () => this.tooltipEl.hide();
        if (this.tooltipEl) {
            isToShow ? toShow() : toHide();
        }
    }
    eventsLegend(data) {
        const element = select(`.line-group-${data.index}`);
        element.classed('line-group__inactive', !element.classed('line-group__inactive'));
    }
    render() {
        return (h("div", { class: "o-layout" },
            h("div", { class: "o-layout--chart" },
                h("svg", { style: this.graphDataMerged.styles, class: "line-chart" })),
            h("div", { class: "o-layout--slot" },
                h("slot", { name: "tooltip" }),
                h("slot", { name: "legend" }))));
    }
    static get is() { return "line-chart"; }
    static get properties() { return {
        "graphData": {
            "type": "Any",
            "attr": "graph-data"
        },
        "lineChartEl": {
            "elementRef": true
        },
        "updateGraphData": {
            "method": true
        }
    }; }
    static get events() { return [{
            "name": "lineChartRendered",
            "method": "lineChartRendered",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ".o-layout {\n  width: 100%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap; }\n  .o-layout--chart {\n    width: 100%; }\n    .is--vertical .o-layout--chart {\n      width: 90%; }\n  .o-layout--slot {\n    width: 100%; }\n    .is--vertical .o-layout--slot {\n      width: 10%;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-pack: center;\n      -ms-flex-pack: center;\n      justify-content: center;\n      -webkit-box-align: center;\n      -ms-flex-align: center;\n      align-items: center; }\n\nline-chart .axis text {\n  font: 0.65rem sans-serif; }\n\nline-chart .axis-label {\n  text-anchor: middle;\n  font: 1rem sans-serif; }\n\nline-chart .grid line {\n  stroke: lightgrey;\n  stroke-opacity: 0.7;\n  shape-rendering: crispEdges; }\n\nline-chart .grid path {\n  stroke-width: 0; }\n\nline-chart .line-group {\n  -webkit-transition: opacity .5s linear;\n  transition: opacity .5s linear; }\n  line-chart .line-group__inactive {\n    opacity: 0; }\n  line-chart .line-group .line {\n    fill: none;\n    stroke-width: 3; }\n  line-chart .line-group .dot {\n    stroke: #FFFFFF; }"; }
}
__decorate([
    resize({
        axisData: true
    })
], LineChart.prototype, "drawChart", null);

export { LineChart };
