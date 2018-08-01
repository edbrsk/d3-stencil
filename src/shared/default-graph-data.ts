import { IGraphData, Formats, LegendData } from './../interfaces';
import {
  hasDataIsNotempty,
  hasDataBCGMatrixIsNotEmpty,
  hasDataValidOnAnnotationsChart
} from './../utils';

export const DEFAULT_GRAPH_DATA_PIE: IGraphData = {
  labels: [],
  pieChartOptions: {
    labelFormat: Formats.ANY,
    dataFormat: Formats.ANY,
    currency: 'EUR'
  },
  styles: {
    width: '0',
    height: '0',
    margin: '0'
  },
  colors: [],
  data: [],
  hasDataMethod: (graphDataMerged: IGraphData) =>
    hasDataIsNotempty(graphDataMerged)
};

export const DEFAULT_GRAPH_DATA_BAR: IGraphData = {
  labels: [],
  barChartOptions: {
    axis: {
      x: {
        visible: true,
        gridVisible: true,
        format: Formats.ANY,
        currency: 'EUR'
      },
      y: {
        visible: true,
        gridVisible: true,
        format: Formats.ANY,
        currency: 'EUR'
      }
    },
    margin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  },
  styles: {
    width: '0',
    height: '0',
    margin: '0'
  },
  colors: [],
  data: [],
  hasDataMethod: (graphDataMerged: IGraphData) =>
    hasDataIsNotempty(graphDataMerged)
};

export const DEFAULT_GRAPH_DATA_LINE: IGraphData = {
  labels: [],
  lineChartOptions: {
    axis: {
      x: {
        visible: true,
        gridVisible: true,
        format: Formats.ANY,
        label: '',
        currency: 'EUR'
      },
      y: {
        visible: true,
        gridVisible: true,
        format: Formats.ANY,
        label: '',
        currency: 'EUR'
      }
    },
    margin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  },
  lineAnnotationsChartOptions: {
    increaseHeight: 100,
    tickSeparation: '2em',
    annotations: [],
    imagePathOneAnnotation: 'assets/images/message_one.svg',
    imagePathSomeAnnotations: 'assets/images/message_some.svg',
    hasDataMethod: (graphDataMerged: IGraphData) =>
      hasDataValidOnAnnotationsChart(graphDataMerged)
  },
  styles: {
    width: '0',
    height: '0',
    margin: '0'
  },
  colors: [],
  data: [],
  hasDataMethod: (graphDataMerged: IGraphData) =>
    hasDataIsNotempty(graphDataMerged)
};

export const DEFAULT_GRAPH_DATA_BCG: IGraphData = {
  labels: [],
  bcgMatrixChartOption: {
    axis: {
      x: {
        visible: false,
        gridVisible: false,
        format: Formats.ANY,
        currency: 'EUR'
      },
      y: {
        visible: false,
        gridVisible: false,
        format: Formats.ANY,
        currency: 'EUR'
      }
    },
    quadrants: true,
    value: {
      format: Formats.ANY,
      currency: 'EUR'
    },
    margin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  },
  styles: {
    width: '0',
    height: '0',
    margin: '0'
  },
  colors: [],
  data: [],
  hasDataMethod: (graphDataMerged: IGraphData) =>
    hasDataBCGMatrixIsNotEmpty(graphDataMerged)
};

export const DEFAULT_LEGEND_DATA: LegendData = {
  labels: [],
  colors: [],
  type: 'horizontal',
  styles: {
    width: '100%',
    height: '50px',
    padding: '10px 0'
  }
};
