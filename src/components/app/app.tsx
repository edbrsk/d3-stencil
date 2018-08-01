import { Component } from '@stencil/core';
import { IGraphData, Formats, LegendData } from './../../interfaces';

@Component({
  tag: 'my-app',
  styleUrl: 'app.scss'
})
export class App {
  GRAPH_DATA_PIE: IGraphData = {
    labels: ['<5', '5-13', '14-17', '18-24', '25-44', '45-64', '≥65'],
    pieChartOptions: {
      labelFormat: Formats.ANY,
      dataFormat: Formats.GROUPED_THOUSANDS_TWO_DIGITS
    },
    styles: {
      width: '100%',
      height: '500px',
      margin: '20px 0'
    },
    colors: [
      '#98abc5',
      '#8a89a6',
      '#7b6888',
      '#6b486b',
      '#a05d56',
      '#d0743c',
      '#ff8c00'
    ],
    data: [[2704659, 4499890, 2159981, 3853788, 16106543, 8819342, 612463]]
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
      '#ff8c00'
    ],
    styles: {
      height: '160px'
    },
    type: 'vertical'
  };

  GRAPH_DATA_BAR: IGraphData = {
    labels: ['<5', '5-13', '14-17', '18-24', '25-44', '45-64', '≥65'],
    barChartOptions: {
      axis: {
        x: {
          format: Formats.CURRENCY
        }
      },
      margin: {
        top: 20,
        right: 40,
        bottom: 20,
        left: 40
      }
    },
    styles: {
      width: '100%',
      height: '500px',
      margin: '20px 0'
    },
    colors: [
      '#98abc5',
      '#8a89a6',
      '#7b6888',
      '#6b486b',
      '#a05d56',
      '#d0743c',
      '#ff8c00'
    ],
    data: [[1250, 200, 20, 140, 600, 3002, 5985]]
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
      '#ff8c00'
    ],
    styles: {
      height: '160px'
    },
    type: 'vertical'
  };

  GRAPH_DATA_PROGRESS_BAR: IGraphData = {
    labels: ['<5'],
    barChartOptions: {
      axis: {
        x: {
          visible: false,
          gridVisible: false
        },
        y: {
          gridVisible: false
        }
      },
      margin: {
        top: 20,
        bottom: 20
      }
    },
    styles: {
      width: '100%',
      height: '10px'
    },
    colors: ['#98abc5'],
    data: [[45]]
  };

  GRAPH_DATA_LINE: IGraphData = {
    labels: [
      1496354400,
      1496440800,
      1496527200,
      1496613600,
      1496700000,
      1496786400,
      1496872800
    ],
    lineChartOptions: {
      axis: {
        x: {
          format: Formats.DAY_AND_MONTH,
          label: 'Days'
        },
        y: {
          format: Formats.GROUPED_TWO_DIGITS,
          label: 'Quantity'
        }
      },
      margin: {
        top: 20,
        right: 30,
        bottom: 50,
        left: 60
      }
    },
    styles: {
      width: '100%',
      height: '500px',
      margin: '20px 0'
    },
    colors: ['#98abc5', '#8a89a6'],
    data: [
      [2704659, 4499890, 2159981, 3853788, 16106543, 8819342, 612463],
      [1004659, 2499890, 1159981, 2853788, 14106543, 6819342, 412463]
    ]
  };

  GRAPH_DATA_LINE_ANNOTATION: IGraphData = {
    labels: [
      1496354400,
      1496440800,
      1496527200,
      1496613600,
      1496700000,
      1496786400,
      1496872800
    ],
    lineChartOptions: {
      axis: {
        x: {
          format: Formats.DAY_AND_MONTH
        },
        y: {
          format: Formats.GROUPED_TWO_DIGITS
        }
      },
      margin: {
        top: 20,
        right: 40,
        bottom: 50,
        left: 40
      }
    },
    lineAnnotationsChartOptions: {
      increaseHeight: 15,
      tickSeparation: '2.5em',
      annotations: [[1], [2], [], [], [4, 5], [], []]
    },
    styles: {
      width: '100%',
      height: '500px',
      margin: '40px 0'
    },
    colors: ['#98abc5', '#8a89a6'],
    data: [
      [2704659, 4499890, 2159981, 3853788, 16106543, 8819342, 612463],
      [1004659, 2499890, 1159981, 2853788, 14106543, 6819342, 412463]
    ]
  };

  LEGEND_DATA_LINE: LegendData = {
    labels: ['14-17', '18-24'],
    colors: ['#98abc5', '#8a89a6'],
    type: 'horizontal'
  };

  GRAPH_DATA_BCG: IGraphData = {
    bcgMatrixChartOption: {
      axis: {
        y: {
          format: Formats.PERCENTAGE
        }
      },
      value: {
        format: Formats.GROUPED_TWO_DIGITS
      },
      margin: {
        top: 20,
        right: 40,
        bottom: 20,
        left: 40
      }
    },
    styles: {
      width: '100%',
      height: '500px',
      margin: '20px 0'
    },
    data: [
      {
        x_data: 0.43,
        y_data: 0.65,
        rel_size: 648860,
        label: '<5',
        color: '#98abc5',
        tooltipInfo: `<b>Current:</b><div class="square"></div> 3 weeks<br>Overview: <div class="square"></div> 4 weeks <div class="square"></div> 3 weeks <div class="square"></div> no`
      },
      {
        x_data: 0.16,
        y_data: 0.34,
        rel_size: 588399,
        label: '5-13',
        color: '#7b6888',
        tooltipInfo: `<b>Current:</b><div class="square"></div> 3 weeks<br>Overview: <div class="square"></div> 4 weeks <div class="square"></div> 3 weeks <div class="square"></div> no`
      },
      {
        x_data: 0.33,
        y_data: 0.22,
        rel_size: 177443,
        label: '14-17',
        color: '#7b6888',
        tooltipInfo: `<b>Current:</b><div class="square"></div> 3 weeks<br>Overview: <div class="square"></div> 4 weeks <div class="square"></div> 3 weeks <div class="square"></div> no`
      },
      {
        x_data: 1.66,
        y_data: 0.72,
        rel_size: 729405,
        label: '18-24',
        color: '#ff8c00',
        tooltipInfo: `<b>Current:</b><div class="square"></div> 3 weeks<br>Overview: <div class="square"></div> 4 weeks <div class="square"></div> 3 weeks <div class="square"></div> no`
      },
      {
        x_data: 1.5,
        y_data: 0.22,
        rel_size: 838025,
        label: '25-44',
        color: '#d0743c',
        tooltipInfo: `<b>Current:</b><div class="square"></div> 3 weeks<br>Overview: <div class="square"></div> 4 weeks <div class="square"></div> 3 weeks <div class="square"></div> no`
      },
      {
        x_data: 1.21,
        y_data: 0.85,
        rel_size: 269605,
        label: '45-64',
        color: '#ff8c00',
        tooltipInfo: `<b>Current:</b><div class="square"></div> 3 weeks<br>Overview: <div class="square"></div> 4 weeks <div class="square"></div> 3 weeks <div class="square"></div> no`
      },
      {
        x_data: 1.21,
        y_data: 0.57,
        rel_size: 569985,
        label: '≥65',
        color: '#ff8c00',
        tooltipInfo: `<b>Current:</b><div class="square"></div> 3 weeks<br>Overview: <div class="square"></div> 4 weeks <div class="square"></div> 3 weeks <div class="square"></div> no`
      }
    ]
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
