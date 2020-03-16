import { GraphData, LegendData } from '../interfaces/index';
import { BcgMatrix } from '../interfaces/data-types';
import {
  hasDataIsNotEmpty,
  hasDataBCGMatrixIsNotEmpty,
  hasDataValidOnAnnotationsChart,
} from '../utils/index';

export const DEFAULT_GRAPH_DATA_PIE: GraphData = {
  pieChart: {
    labelFormat: 'ANY',
    dataFormat: 'ANY',
    currency: 'EUR',
  },
  styles: {
    width: '0',
    height: '0',
    margin: '0',
  },
  labels: [],
  colors: [],
  data: [],
  hasData: (graphData: GraphData) => hasDataIsNotEmpty(graphData),
};

export const DEFAULT_GRAPH_DATA_BAR: GraphData = {
  barChart: {
    axis: {
      x: {
        visible: true,
        gridVisible: true,
        format: 'ANY',
        currency: 'EUR',
      },
      y: {
        visible: true,
        gridVisible: true,
        format: 'ANY',
        currency: 'EUR',
      },
    },
    margin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  },
  styles: {
    width: '0',
    height: '0',
    margin: '0',
  },
  labels: [],
  colors: [],
  data: [],
  hasData: (graphData: GraphData) => hasDataIsNotEmpty(graphData),
};

export const DEFAULT_GRAPH_DATA_LINE: GraphData = {
  lineChart: {
    axis: {
      x: {
        visible: true,
        gridVisible: true,
        format: 'ANY',
        label: '',
        currency: 'EUR',
      },
      y: {
        visible: true,
        gridVisible: true,
        format: 'ANY',
        label: '',
        currency: 'EUR',
      },
    },
    margin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  },
  styles: {
    width: '0',
    height: '0',
    margin: '0',
  },
  labels: [],
  colors: [],
  data: [],
  hasData: (graphData: GraphData) => hasDataIsNotEmpty(graphData),
};

export const DEFAULT_GRAPH_DATA_ANNOTATIONS_LINE: GraphData = {
  lineChart: {
    axis: {
      x: {
        visible: true,
        gridVisible: true,
        format: 'ANY',
        label: '',
        currency: 'EUR',
      },
      y: {
        visible: true,
        gridVisible: true,
        format: 'ANY',
        label: '',
        currency: 'EUR',
      },
    },
    margin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  },
  lineAnnotationsChart: {
    increaseHeight: 100,
    tickSeparation: '2em',
    annotations: [],
    imagePathOneAnnotation: 'assets/images/message_one.svg',
    imagePathSomeAnnotations: 'assets/images/message_some.svg',
  },
  styles: {
    width: '0',
    height: '0',
    margin: '0',
  },
  labels: [],
  colors: [],
  data: [],
  hasData: (graphData: GraphData) => hasDataValidOnAnnotationsChart(graphData),
};

export const DEFAULT_GRAPH_DATA_BCG: GraphData<BcgMatrix[]> = {
  bcgMatrixChart: {
    axis: {
      x: {
        visible: false,
        gridVisible: false,
        format: 'ANY',
        currency: 'EUR',
      },
      y: {
        visible: false,
        gridVisible: false,
        format: 'ANY',
        currency: 'EUR',
      },
    },
    value: {
      format: 'ANY',
      currency: 'EUR',
    },
    margin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    quadrants: true,
  },
  styles: {
    width: '0',
    height: '0',
    margin: '0',
  },
  colors: [],
  labels: [],
  data: [],
  hasData: (graphDataMerged: GraphData<BcgMatrix[]>) =>
    hasDataBCGMatrixIsNotEmpty(graphDataMerged),
};

export const DEFAULT_LEGEND_DATA: LegendData = {
  labels: [],
  colors: [],
  type: 'horizontal',
  styles: {
    width: '100%',
    height: '50px',
    padding: '10px 0',
  },
};
