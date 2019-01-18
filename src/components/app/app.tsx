import { Component } from '@stencil/core';
import { GraphData, LegendData } from '@d3-stencil/interfaces';
import { BcgMatrix } from '@d3-stencil/interfaces/data-types';

@Component({
  tag: 'my-app',
  styleUrl: 'app.scss',
})
export class App {
  GRAPH_DATA_PIE: GraphData<number[]> = {
    pieChart: {
      labelFormat: 'ANY',
      dataFormat: 'GROUPED_THOUSANDS_TWO_DIGITS',
    },
    styles: {
      width: '100%',
      height: '500px',
      margin: '20px 0',
    },
    colors: [
      '#98abc5',
      '#8a89a6',
      '#7b6888',
      '#6b486b',
      '#a05d56',
      '#d0743c',
      '#ff8c00',
    ],
    labels: ['<5', '5-13', '14-17', '18-24', '25-44', '45-64', '≥65'],
    data: [2704659, 4499890, 2159981, 3853788, 16106543, 8819342, 612463],
  };

  LEGEND_DATA_PIE: LegendData = {
    labels: ['<5', '5-13', '14-17', '18-24', '25-44', '45-64', '≥65'],
    colors: [
      '#98abc5',
      '#8a89a6',
      '#7b6888',
      '#6b486b',
      '#a05d56',
      '#d0743c',
      '#ff8c00',
    ],
    styles: {
      height: '160px',
    },
    type: 'vertical',
  };

  GRAPH_DATA_BAR: GraphData<number[]> = {
    barChart: {
      axis: {
        x: {
          format: 'CURRENCY',
        },
      },
      margin: {
        top: 20,
        right: 40,
        bottom: 20,
        left: 40,
      },
    },
    styles: {
      width: '100%',
      height: '500px',
      margin: '20px 0',
    },
    colors: [
      '#98abc5',
      '#8a89a6',
      '#7b6888',
      '#6b486b',
      '#a05d56',
      '#d0743c',
      '#ff8c00',
    ],
    labels: ['<5', '5-13', '14-17', '18-24', '25-44', '45-64', '≥65'],
    data: [1250, 200, 20, 140, 600, 3002, 5985],
  };

  LEGEND_DATA_BAR: LegendData = {
    labels: ['<5', '5-13', '14-17', '18-24', '25-44', '45-64', '≥65'],
    colors: [
      '#98abc5',
      '#8a89a6',
      '#7b6888',
      '#6b486b',
      '#a05d56',
      '#d0743c',
      '#ff8c00',
    ],
    styles: {
      height: '160px',
    },
    type: 'vertical',
  };

  GRAPH_DATA_PROGRESS_BAR: GraphData<number[]> = {
    barChart: {
      axis: {
        x: {
          visible: false,
          gridVisible: false,
        },
        y: {
          gridVisible: false,
        },
      },
      margin: {
        top: 20,
        bottom: 20,
      },
    },
    styles: {
      width: '100%',
      height: '10px',
    },
    colors: ['#98abc5'],
    labels: ['<5'],
    data: [45],
  };

  GRAPH_DATA_LINE: GraphData = {
    lineChart: {
      axis: {
        x: {
          format: 'DAY_AND_MONTH',
          label: 'Days',
        },
        y: {
          format: 'GROUPED_TWO_DIGITS',
          label: 'Quantity',
        },
      },
      margin: {
        top: 20,
        right: 30,
        bottom: 50,
        left: 60,
      },
    },
    styles: {
      width: '100%',
      height: '500px',
      margin: '20px 0',
    },
    colors: ['#98abc5', '#8a89a6'],
    labels: [
      1496354400,
      1496440800,
      1496527200,
      1496613600,
      1496700000,
      1496786400,
      1496872800,
    ],
    data: [
      [2704659, 4499890, 2159981, 3853788, 16106543, 8819342, 612463],
      [1004659, 2499890, 1159981, 2853788, 14106543, 6819342, 412463],
    ],
  };

  GRAPH_DATA_LINE_ANNOTATION: GraphData = {
    lineChart: {
      axis: {
        x: {
          format: 'DAY_AND_MONTH',
          label: 'Days',
        },
        y: {
          format: 'GROUPED_TWO_DIGITS',
          label: 'Quantity',
        },
      },
      margin: {
        top: 20,
        right: 30,
        bottom: 50,
        left: 60,
      },
    },
    lineAnnotationsChart: {
      increaseHeight: 15,
      tickSeparation: '2.5em',
      annotations: [[1], [2], [], [], [4, 5], [], []],
    },
    styles: {
      width: '100%',
      height: '500px',
      margin: '40px 0',
    },
    colors: ['#98abc5', '#8a89a6'],
    labels: [
      1496354400,
      1496440800,
      1496527200,
      1496613600,
      1496700000,
      1496786400,
      1496872800,
    ],
    data: [
      [2704659, 4499890, 2159981, 3853788, 16106543, 8819342, 612463],
      [1004659, 2499890, 1159981, 2853788, 14106543, 6819342, 412463],
    ],
  };

  LEGEND_DATA_LINE: LegendData = {
    labels: ['14-17', '18-24'],
    colors: ['#98abc5', '#8a89a6'],
    type: 'horizontal',
  };

  GRAPH_DATA_BCG: GraphData<BcgMatrix[]> = {
    bcgMatrixChart: {
      axis: {
        y: {
          format: 'PERCENTAGE',
        },
      },
      margin: {
        top: 20,
        right: 40,
        bottom: 20,
        left: 40,
      },
      value: {
        format: 'GROUPED_TWO_DIGITS',
      },
    },
    styles: {
      width: '100%',
      height: '500px',
      margin: '20px 0',
    },
    colors: [
      '#98abc5',
      '#7b6888',
      '#7b6888',
      '#ff8c00',
      '#d0743c',
      '#ff8c00',
      '#ff8c00',
    ],
    labels: ['<5', '5-13', '14-17', '18-24', '25-44', '45-64', '≥65'],
    data: [
      {
        x_data: 0.43,
        y_data: 0.65,
        rel_size: 648860,
        tooltipInfo: `<b>Current:</b><div class="square"></div> 3 weeks<br>Overview: <div class="square"></div> 4 weeks <div class="square"></div> 3 weeks <div class="square"></div> no`,
      },
      {
        x_data: 0.16,
        y_data: 0.34,
        rel_size: 588399,
        tooltipInfo: `<b>Current:</b><div class="square"></div> 3 weeks<br>Overview: <div class="square"></div> 4 weeks <div class="square"></div> 3 weeks <div class="square"></div> no`,
      },
      {
        x_data: 0.33,
        y_data: 0.22,
        rel_size: 177443,
        tooltipInfo: `<b>Current:</b><div class="square"></div> 3 weeks<br>Overview: <div class="square"></div> 4 weeks <div class="square"></div> 3 weeks <div class="square"></div> no`,
      },
      {
        x_data: 1.66,
        y_data: 0.72,
        rel_size: 729405,
        tooltipInfo: `<b>Current:</b><div class="square"></div> 3 weeks<br>Overview: <div class="square"></div> 4 weeks <div class="square"></div> 3 weeks <div class="square"></div> no`,
      },
      {
        x_data: 1.5,
        y_data: 0.22,
        rel_size: 838025,
        tooltipInfo: `<b>Current:</b><div class="square"></div> 3 weeks<br>Overview: <div class="square"></div> 4 weeks <div class="square"></div> 3 weeks <div class="square"></div> no`,
      },
      {
        x_data: 1.21,
        y_data: 0.85,
        rel_size: 269605,
        tooltipInfo: `<b>Current:</b><div class="square"></div> 3 weeks<br>Overview: <div class="square"></div> 4 weeks <div class="square"></div> 3 weeks <div class="square"></div> no`,
      },
      {
        x_data: 1.21,
        y_data: 0.57,
        rel_size: 569985,
        tooltipInfo: `<b>Current:</b><div class="square"></div> 3 weeks<br>Overview: <div class="square"></div> 4 weeks <div class="square"></div> 3 weeks <div class="square"></div> no`,
      },
    ],
  };

  render() {
    return (
      <div>
        <header>
          <stencil-route-link url="/">
            <h1>Stencil Graphs | API Reference</h1>
          </stencil-route-link>
        </header>

        <main>
          <h1>Pie Chart:</h1>
          <pie-chart graphData={this.GRAPH_DATA_PIE}>
            <tooltip-chart slot="tooltip" />
            <legend-chart slot="legend" legendData={this.LEGEND_DATA_PIE} />
          </pie-chart>
          <div class="example">
            <pre class="language-tsx">
              <code class="language-tsx">
                {JSON.stringify(this.GRAPH_DATA_PIE, null, 2)}
              </code>
            </pre>
          </div>

          <h1>Horizontal Bar Chart:</h1>
          <horizontal-bar-chart graphData={this.GRAPH_DATA_BAR}>
            <tooltip-chart slot="tooltip" />
            <legend-chart slot="legend" legendData={this.LEGEND_DATA_BAR} />
          </horizontal-bar-chart>
          <div class="example">
            <pre class="language-tsx">
              <code class="language-tsx">
                {JSON.stringify(this.GRAPH_DATA_BAR, null, 2)}
              </code>
            </pre>
          </div>

          <h3>Extra: Progress bar</h3>
          <horizontal-bar-chart
            graphData={this.GRAPH_DATA_PROGRESS_BAR}
            class="progress-bar"
          />
          <div class="example">
            <pre class="language-tsx">
              <code class="language-tsx">
                {JSON.stringify(this.GRAPH_DATA_PROGRESS_BAR, null, 2)}
              </code>
            </pre>
          </div>
          <h1>Line Chart:</h1>
          <line-chart graphData={this.GRAPH_DATA_LINE}>
            <tooltip-chart slot="tooltip" />
            <legend-chart slot="legend" legendData={this.LEGEND_DATA_LINE} />
          </line-chart>
          <div class="example">
            <pre class="language-tsx">
              <code class="language-tsx">
                {JSON.stringify(this.GRAPH_DATA_LINE, null, 2)}
              </code>
            </pre>
          </div>

          <h1>Annotations Line Chart:</h1>
          <line-annotations-chart graphData={this.GRAPH_DATA_LINE_ANNOTATION} />
          <div class="example">
            <pre class="language-tsx">
              <code class="language-tsx">
                {JSON.stringify(this.GRAPH_DATA_LINE_ANNOTATION, null, 2)}
              </code>
            </pre>
          </div>

          <h1>BCG Matrix Chart:</h1>
          <bcg-matrix-chart graphData={this.GRAPH_DATA_BCG}>
            <tooltip-chart slot="tooltip" align={'left'} />
          </bcg-matrix-chart>
          <div class="example">
            <pre class="language-tsx">
              <code class="language-tsx">
                {JSON.stringify(this.GRAPH_DATA_BCG, null, 2)}
              </code>
            </pre>
          </div>
        </main>
      </div>
    );
  }
}
