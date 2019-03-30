---
id: api-introduction
title: API Introduction
---

## How it works?

To getting started, you need to know how to put your data into D3-Stencil components. All of these [components](#components) accepts an object of type `GraphData` by props.

Let's take a look at this kind of object, just the parts you should keep in mind.

```typescript
type GraphData<T = number[][]> = Partial<{
  pieChart: PieChart; // Specific options for the PieChart.
  barChart: BarChart; // Specific options for the BarChart.
  lineChart: LineChart; // Specific options for the LineChart.
  lineAnnotationsChart: LineAnnotationsChart; // Specific options for the LineAnnotationsChart.
  bcgMatrixChart: BcgMatrixChart; // Specific options for the BcgMatrixChart.
  styles: Styles; // Styles Type - Check it more in-depth in the API Reference - Types.
  colors: string[];
  labels: string[] | number[];
  data: Data<T>; // number[][] in the default value.
}>;
```

If you have been using TypeScript for a while, you may have noticed that we are using types obviously and more things like:

- [Advanced Types](https://www.typescriptlang.org/docs/handbook/advanced-types.html)
- [Generics](https://www.typescriptlang.org/docs/handbook/generics.html)

If you are not familiar with TypeScript, don't worry, you can read the reason behind this below.

Let's start with `Partial<{}>`. In this case `Partial<{}>` means that all the properties in `GraphData` are optional, so we can create our `GraphData` object just with the properties we want to change. It is because the expected type is optional and all of D3-Stencil components have an internal copy with the default values.

Regarding the Generic types, we need to focus on the main intention, which it was to create a kind of object the most flexible as possible, but not all the data that you need to manage has the same structure to fit in a bidimensional array of numbers, this was the primary cause to use Generics.

If you are not using TypeScript, don't worry about that, but if you are using it is interesting because you can specify the type of your data when you will be making your `GraphData` object. For example, the default value is `GraphData<number[][]>` and it works for the `chart-line`, but in the BCGMatrix the component specify the kind of object expected, which should be `Graph<BcgMatrix[]>`.

To explain it in a nutshell, this brings to us the opportunity to be more strict in the implementation of each component, and a little bit more flexible with the types & interfaces.

Don't focus grasp all the types & interfaces, and how these are related, etc. You can go to read the [API Reference - Types](/docs/api/api-types) and there you can grasp the concepts more in-depth, but now let's going to see how to works with `GraphData` object, components, and check some examples.

## Components

The examples below implements the specific attributes about you haven't read yet, and those depend on the charts we are using. Don't focus too much on the Styles, Axis, Formats, Margin. You'll be able to go further reading the [API Reference - Types](/docs/api/api-types).

### Pie Chart

![pie-chart](/img/charts/pie-chart.png)

Tag:

```jsx
<pie-chart graphData={GRAPH_DATA} />
```

GraphData example:

```typescript
const GRAPH_DATA: GraphData<number[]> = {
  pieChart: {
    labelFormat: 'ANY',
    dataFormat: 'GROUPED_TWO_DIGITS',
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
```

### Horizontal Bar Chart

![horizontal-bar-chart](/img/charts/horizontal-bar-chart.png)

Tag:

```jsx
<horizontal-bar-chart graphData={GRAPH_DATA} />
```

```typescript
const GRAPH_DATA: GraphData<number[]> = {
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
```

#### Style tip: Progress bar

![horizontal-bar-chart-progress-bar](/img/charts/horizontal-bar-chart-progress-bar.png)

```typescript
const GRAPH_DATA: GraphData<number[]> = {
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
```

### Line Chart

![line-chart](/img/charts/line-chart.png)

Tag:

```jsx
<line-chart graphData={GRAPH_DATA} />
```

```typescript
const GRAPH_DATA: GraphData = {
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
```

### Line Annotations Chart

![line-annotations-chart](/img/charts/line-annotations-chart.png)

```jsx
<line-annotations-chart graphData={GRAPH_DATA} />
```

```typescript
const GRAPH_DATA: GraphData = {
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
    tickSeparation: '2em',
    annotations: [[34], [15], [], [], [67, 90], [], []],
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
```

### BCG Matrix Chart

![bcg-matrix-chart](/img/charts/bcg-matrix-chart.png)

```jsx
<bcg-matrix-chart graphData={GRAPH_DATA} />
```

```typescript
const GRAPH_DATA: GraphData<BcgMatrix[]> = {
  bcgMatrixChart: {
    axis: {
      y: {
        format: 'PERCENTAGE',
      },
    },
    value: {
      format: 'GROUPED_TWO_DIGITS',
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
      tooltipInfo: `<b>Current:</b><div class="square stars"></div> 5 weeks<br>Overview: <div class="square stars"></div> 10 weeks <div class="square question-mark"></div> 30 weeks`,
    },
    {
      x_data: 0.16,
      y_data: 0.34,
      rel_size: 588399,
      tooltipInfo: `<b>Current:</b><div class="square cash_cows"></div> 5 weeks<br>Overview: <div class="square cash_cows"></div> 10 weeks <div class="square dogs"></div> 30 weeks`,
    },
    {
      x_data: 0.33,
      y_data: 0.22,
      rel_size: 177443,
      tooltipInfo: `<b>Current:</b><div class="square cash_cows"></div> 5 weeks<br>Overview: <div class="square cash_cows"></div> 10 weeks <div class="square dogs"></div> 30 weeks`,
    },
    {
      x_data: 1.66,
      y_data: 0.72,
      rel_size: 729405,
      tooltipInfo: `<b>Current:</b><div class="square question-mark"></div> 5 weeks<br>Overview: <div class="square question-mark"></div> 10 weeks <div class="square stars"></div> 30 weeks`,
    },
    {
      x_data: 1.5,
      y_data: 0.22,
      rel_size: 838025,
      tooltipInfo: `<b>Current:</b><div class="square dogs"></div> 5 weeks<br>Overview: <div class="square dogs"></div> 10 weeks <div class="square dogs"></div> 30 weeks`,
    },
    {
      x_data: 1.21,
      y_data: 0.85,
      rel_size: 269605,
      tooltipInfo: `<b>Current:</b><div class="square question-mark"></div> 5 weeks<br>Overview: <div class="square question-mark"></div> 10 weeks <div class="square dogs"></div> 30 weeks`,
    },
    {
      x_data: 1.21,
      y_data: 0.57,
      rel_size: 569985,
      tooltipInfo: `<b>Current:</b><div class="square question-mark"></div> 5 weeks<br>Overview: <div class="square question-mark"></div> 10 weeks <div class="square question-mark"></div> 30 weeks`,
    },
  ],
};
```

## Named Slots

You can add a tooltip and a legend using named slots into your chart. Keep in mind you will need to add `slot="tooltip"` or `slot="legend"` into the tag, this is required for the component to init those gaps.

### Tooltip

The Tooltip shows the value regarding the user mouse point, and this will have the format that you have put in the specific charts options.

Also, and not least you can pass the `text-align` property by props. The default value is `center`.

```jsx
<tooltip-chart slot="tooltip" align="left" />
```

### Legend

The Legend is a bit more customizable as accepts an object of type [`LegendData`](/docs/api/api-types#legenddata) by props.

```jsx
<legend-chart slot="legend" legendData={LEGEND_DATA} />
```
