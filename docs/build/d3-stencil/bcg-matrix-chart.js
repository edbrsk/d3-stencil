/*! Built with http://stenciljs.com */
const { h } = window.D3Stencil;

import { a as objectAssignDeep, b as select, c as event, d as max, f as scaleLinear, g as axisBottom, h as axisLeft, j as resize, k as initTooltipIfExists, m as formatter, l as initLegendIfExists, p as DEFAULT_GRAPH_DATA_BCG, q as scaleBand, n as circularFind, r as DEFAULT_GRAPH_DATA_BAR, s as DEFAULT_LEGEND_DATA, e as scaleOrdinal, o as DEFAULT_GRAPH_DATA_LINE, t as Formats, u as arc, v as pie, w as DEFAULT_GRAPH_DATA_PIE, x as color, y as interpolateNumber, z as interpolateRgb, A as interpolateString, B as interpolateTransformSvg, C as namespace, D as matcher, E as selector, F as selectorAll, G as selection, H as interpolateTransformCss, I as styleValue } from './chunk-b53f2ffd.js';

function count(node) {
  var sum = 0,
      children = node.children,
      i = children && children.length;
  if (!i) sum = 1;
  else while (--i >= 0) sum += children[i].value;
  node.value = sum;
}

function node_count() {
  return this.eachAfter(count);
}

function node_each(callback) {
  var node = this, current, next = [node], children, i, n;
  do {
    current = next.reverse(), next = [];
    while (node = current.pop()) {
      callback(node), children = node.children;
      if (children) for (i = 0, n = children.length; i < n; ++i) {
        next.push(children[i]);
      }
    }
  } while (next.length);
  return this;
}

function node_eachBefore(callback) {
  var node = this, nodes = [node], children, i;
  while (node = nodes.pop()) {
    callback(node), children = node.children;
    if (children) for (i = children.length - 1; i >= 0; --i) {
      nodes.push(children[i]);
    }
  }
  return this;
}

function node_eachAfter(callback) {
  var node = this, nodes = [node], next = [], children, i, n;
  while (node = nodes.pop()) {
    next.push(node), children = node.children;
    if (children) for (i = 0, n = children.length; i < n; ++i) {
      nodes.push(children[i]);
    }
  }
  while (node = next.pop()) {
    callback(node);
  }
  return this;
}

function node_sum(value) {
  return this.eachAfter(function(node) {
    var sum = +value(node.data) || 0,
        children = node.children,
        i = children && children.length;
    while (--i >= 0) sum += children[i].value;
    node.value = sum;
  });
}

function node_sort(compare) {
  return this.eachBefore(function(node) {
    if (node.children) {
      node.children.sort(compare);
    }
  });
}

function node_path(end) {
  var start = this,
      ancestor = leastCommonAncestor(start, end),
      nodes = [start];
  while (start !== ancestor) {
    start = start.parent;
    nodes.push(start);
  }
  var k = nodes.length;
  while (end !== ancestor) {
    nodes.splice(k, 0, end);
    end = end.parent;
  }
  return nodes;
}

function leastCommonAncestor(a, b) {
  if (a === b) return a;
  var aNodes = a.ancestors(),
      bNodes = b.ancestors(),
      c = null;
  a = aNodes.pop();
  b = bNodes.pop();
  while (a === b) {
    c = a;
    a = aNodes.pop();
    b = bNodes.pop();
  }
  return c;
}

function node_ancestors() {
  var node = this, nodes = [node];
  while (node = node.parent) {
    nodes.push(node);
  }
  return nodes;
}

function node_descendants() {
  var nodes = [];
  this.each(function(node) {
    nodes.push(node);
  });
  return nodes;
}

function node_leaves() {
  var leaves = [];
  this.eachBefore(function(node) {
    if (!node.children) {
      leaves.push(node);
    }
  });
  return leaves;
}

function node_links() {
  var root = this, links = [];
  root.each(function(node) {
    if (node !== root) { // Don’t include the root’s parent, if any.
      links.push({source: node.parent, target: node});
    }
  });
  return links;
}

function hierarchy(data, children) {
  var root = new Node(data),
      valued = +data.value && (root.value = data.value),
      node,
      nodes = [root],
      child,
      childs,
      i,
      n;

  if (children == null) children = defaultChildren;

  while (node = nodes.pop()) {
    if (valued) node.value = +node.data.value;
    if ((childs = children(node.data)) && (n = childs.length)) {
      node.children = new Array(n);
      for (i = n - 1; i >= 0; --i) {
        nodes.push(child = node.children[i] = new Node(childs[i]));
        child.parent = node;
        child.depth = node.depth + 1;
      }
    }
  }

  return root.eachBefore(computeHeight);
}

function node_copy() {
  return hierarchy(this).eachBefore(copyData);
}

function defaultChildren(d) {
  return d.children;
}

function copyData(node) {
  node.data = node.data.data;
}

function computeHeight(node) {
  var height = 0;
  do node.height = height;
  while ((node = node.parent) && (node.height < ++height));
}

function Node(data) {
  this.data = data;
  this.depth =
  this.height = 0;
  this.parent = null;
}

Node.prototype = hierarchy.prototype = {
  constructor: Node,
  count: node_count,
  each: node_each,
  eachAfter: node_eachAfter,
  eachBefore: node_eachBefore,
  sum: node_sum,
  sort: node_sort,
  path: node_path,
  ancestors: node_ancestors,
  descendants: node_descendants,
  leaves: node_leaves,
  links: node_links,
  copy: node_copy
};

var slice = Array.prototype.slice;

function shuffle(array) {
  var m = array.length,
      t,
      i;

  while (m) {
    i = Math.random() * m-- | 0;
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

function enclose(circles) {
  var i = 0, n = (circles = shuffle(slice.call(circles))).length, B = [], p, e;

  while (i < n) {
    p = circles[i];
    if (e && enclosesWeak(e, p)) ++i;
    else e = encloseBasis(B = extendBasis(B, p)), i = 0;
  }

  return e;
}

function extendBasis(B, p) {
  var i, j;

  if (enclosesWeakAll(p, B)) return [p];

  // If we get here then B must have at least one element.
  for (i = 0; i < B.length; ++i) {
    if (enclosesNot(p, B[i])
        && enclosesWeakAll(encloseBasis2(B[i], p), B)) {
      return [B[i], p];
    }
  }

  // If we get here then B must have at least two elements.
  for (i = 0; i < B.length - 1; ++i) {
    for (j = i + 1; j < B.length; ++j) {
      if (enclosesNot(encloseBasis2(B[i], B[j]), p)
          && enclosesNot(encloseBasis2(B[i], p), B[j])
          && enclosesNot(encloseBasis2(B[j], p), B[i])
          && enclosesWeakAll(encloseBasis3(B[i], B[j], p), B)) {
        return [B[i], B[j], p];
      }
    }
  }

  // If we get here then something is very wrong.
  throw new Error;
}

function enclosesNot(a, b) {
  var dr = a.r - b.r, dx = b.x - a.x, dy = b.y - a.y;
  return dr < 0 || dr * dr < dx * dx + dy * dy;
}

function enclosesWeak(a, b) {
  var dr = a.r - b.r + 1e-6, dx = b.x - a.x, dy = b.y - a.y;
  return dr > 0 && dr * dr > dx * dx + dy * dy;
}

function enclosesWeakAll(a, B) {
  for (var i = 0; i < B.length; ++i) {
    if (!enclosesWeak(a, B[i])) {
      return false;
    }
  }
  return true;
}

function encloseBasis(B) {
  switch (B.length) {
    case 1: return encloseBasis1(B[0]);
    case 2: return encloseBasis2(B[0], B[1]);
    case 3: return encloseBasis3(B[0], B[1], B[2]);
  }
}

function encloseBasis1(a) {
  return {
    x: a.x,
    y: a.y,
    r: a.r
  };
}

function encloseBasis2(a, b) {
  var x1 = a.x, y1 = a.y, r1 = a.r,
      x2 = b.x, y2 = b.y, r2 = b.r,
      x21 = x2 - x1, y21 = y2 - y1, r21 = r2 - r1,
      l = Math.sqrt(x21 * x21 + y21 * y21);
  return {
    x: (x1 + x2 + x21 / l * r21) / 2,
    y: (y1 + y2 + y21 / l * r21) / 2,
    r: (l + r1 + r2) / 2
  };
}

function encloseBasis3(a, b, c) {
  var x1 = a.x, y1 = a.y, r1 = a.r,
      x2 = b.x, y2 = b.y, r2 = b.r,
      x3 = c.x, y3 = c.y, r3 = c.r,
      a2 = x1 - x2,
      a3 = x1 - x3,
      b2 = y1 - y2,
      b3 = y1 - y3,
      c2 = r2 - r1,
      c3 = r3 - r1,
      d1 = x1 * x1 + y1 * y1 - r1 * r1,
      d2 = d1 - x2 * x2 - y2 * y2 + r2 * r2,
      d3 = d1 - x3 * x3 - y3 * y3 + r3 * r3,
      ab = a3 * b2 - a2 * b3,
      xa = (b2 * d3 - b3 * d2) / (ab * 2) - x1,
      xb = (b3 * c2 - b2 * c3) / ab,
      ya = (a3 * d2 - a2 * d3) / (ab * 2) - y1,
      yb = (a2 * c3 - a3 * c2) / ab,
      A = xb * xb + yb * yb - 1,
      B = 2 * (r1 + xa * xb + ya * yb),
      C = xa * xa + ya * ya - r1 * r1,
      r = -(A ? (B + Math.sqrt(B * B - 4 * A * C)) / (2 * A) : C / B);
  return {
    x: x1 + xa + xb * r,
    y: y1 + ya + yb * r,
    r: r
  };
}

function place(b, a, c) {
  var dx = b.x - a.x, x, a2,
      dy = b.y - a.y, y, b2,
      d2 = dx * dx + dy * dy;
  if (d2) {
    a2 = a.r + c.r, a2 *= a2;
    b2 = b.r + c.r, b2 *= b2;
    if (a2 > b2) {
      x = (d2 + b2 - a2) / (2 * d2);
      y = Math.sqrt(Math.max(0, b2 / d2 - x * x));
      c.x = b.x - x * dx - y * dy;
      c.y = b.y - x * dy + y * dx;
    } else {
      x = (d2 + a2 - b2) / (2 * d2);
      y = Math.sqrt(Math.max(0, a2 / d2 - x * x));
      c.x = a.x + x * dx - y * dy;
      c.y = a.y + x * dy + y * dx;
    }
  } else {
    c.x = a.x + c.r;
    c.y = a.y;
  }
}

function intersects(a, b) {
  var dr = a.r + b.r - 1e-6, dx = b.x - a.x, dy = b.y - a.y;
  return dr > 0 && dr * dr > dx * dx + dy * dy;
}

function score(node) {
  var a = node._,
      b = node.next._,
      ab = a.r + b.r,
      dx = (a.x * b.r + b.x * a.r) / ab,
      dy = (a.y * b.r + b.y * a.r) / ab;
  return dx * dx + dy * dy;
}

function Node$1(circle) {
  this._ = circle;
  this.next = null;
  this.previous = null;
}

function packEnclose(circles) {
  if (!(n = circles.length)) return 0;

  var a, b, c, n, aa, ca, i, j, k, sj, sk;

  // Place the first circle.
  a = circles[0], a.x = 0, a.y = 0;
  if (!(n > 1)) return a.r;

  // Place the second circle.
  b = circles[1], a.x = -b.r, b.x = a.r, b.y = 0;
  if (!(n > 2)) return a.r + b.r;

  // Place the third circle.
  place(b, a, c = circles[2]);

  // Initialize the front-chain using the first three circles a, b and c.
  a = new Node$1(a), b = new Node$1(b), c = new Node$1(c);
  a.next = c.previous = b;
  b.next = a.previous = c;
  c.next = b.previous = a;

  // Attempt to place each remaining circle…
  pack: for (i = 3; i < n; ++i) {
    place(a._, b._, c = circles[i]), c = new Node$1(c);

    // Find the closest intersecting circle on the front-chain, if any.
    // “Closeness” is determined by linear distance along the front-chain.
    // “Ahead” or “behind” is likewise determined by linear distance.
    j = b.next, k = a.previous, sj = b._.r, sk = a._.r;
    do {
      if (sj <= sk) {
        if (intersects(j._, c._)) {
          b = j, a.next = b, b.previous = a, --i;
          continue pack;
        }
        sj += j._.r, j = j.next;
      } else {
        if (intersects(k._, c._)) {
          a = k, a.next = b, b.previous = a, --i;
          continue pack;
        }
        sk += k._.r, k = k.previous;
      }
    } while (j !== k.next);

    // Success! Insert the new circle c between a and b.
    c.previous = a, c.next = b, a.next = b.previous = b = c;

    // Compute the new closest circle pair to the centroid.
    aa = score(a);
    while ((c = c.next) !== b) {
      if ((ca = score(c)) < aa) {
        a = c, aa = ca;
      }
    }
    b = a.next;
  }

  // Compute the enclosing circle of the front chain.
  a = [b._], c = b; while ((c = c.next) !== b) a.push(c._); c = enclose(a);

  // Translate the circles to put the enclosing circle around the origin.
  for (i = 0; i < n; ++i) a = circles[i], a.x -= c.x, a.y -= c.y;

  return c.r;
}

function optional(f) {
  return f == null ? null : required(f);
}

function required(f) {
  if (typeof f !== "function") throw new Error;
  return f;
}

function constantZero() {
  return 0;
}

function constant(x) {
  return function() {
    return x;
  };
}

function defaultRadius(d) {
  return Math.sqrt(d.value);
}

function pack$1() {
  var radius = null,
      dx = 1,
      dy = 1,
      padding = constantZero;

  function pack(root) {
    root.x = dx / 2, root.y = dy / 2;
    if (radius) {
      root.eachBefore(radiusLeaf(radius))
          .eachAfter(packChildren(padding, 0.5))
          .eachBefore(translateChild(1));
    } else {
      root.eachBefore(radiusLeaf(defaultRadius))
          .eachAfter(packChildren(constantZero, 1))
          .eachAfter(packChildren(padding, root.r / Math.min(dx, dy)))
          .eachBefore(translateChild(Math.min(dx, dy) / (2 * root.r)));
    }
    return root;
  }

  pack.radius = function(x) {
    return arguments.length ? (radius = optional(x), pack) : radius;
  };

  pack.size = function(x) {
    return arguments.length ? (dx = +x[0], dy = +x[1], pack) : [dx, dy];
  };

  pack.padding = function(x) {
    return arguments.length ? (padding = typeof x === "function" ? x : constant(+x), pack) : padding;
  };

  return pack;
}

function radiusLeaf(radius) {
  return function(node) {
    if (!node.children) {
      node.r = Math.max(0, +radius(node) || 0);
    }
  };
}

function packChildren(padding, k) {
  return function(node) {
    if (children = node.children) {
      var children,
          i,
          n = children.length,
          r = padding(node) * k || 0,
          e;

      if (r) for (i = 0; i < n; ++i) children[i].r += r;
      e = packEnclose(children);
      if (r) for (i = 0; i < n; ++i) children[i].r -= r;
      node.r = e + r;
    }
  };
}

function translateChild(k) {
  return function(node) {
    var parent = node.parent;
    node.r *= k;
    if (parent) {
      node.x = parent.x + k * node.x;
      node.y = parent.y + k * node.y;
    }
  };
}

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
class BGCMatrixChart {
    constructor() {
        this.dataSet = { children: [] };
        this.bubbleOptions = {
            padding: 20,
            height: 15,
            fontSize: 13,
            opacity: 0.8
        };
    }
    componentWillLoad() {
        this.graphDataMerged = objectAssignDeep(Object.assign({}, DEFAULT_GRAPH_DATA_BCG), this.graphData);
    }
    componentDidLoad() {
        this.svg = select(this.bgcMatrixChartEl.getElementsByTagName('svg')[0]);
        this.height =
            this.svg.node().getBoundingClientRect().height -
                this.graphDataMerged.bcgMatrixChartOption.margin.top -
                this.graphDataMerged.bcgMatrixChartOption.margin.bottom;
        this.tooltipEl = initTooltipIfExists(this.bgcMatrixChartEl, 'tooltip').component;
        this.legendEl = initLegendIfExists(this.bgcMatrixChartEl, 'legend', this.eventsLegend.bind(this)).component;
        this.dataSet.children = this.graphDataMerged.data;
        this.drawChart();
    }
    updateGraphData(graphData) {
        this.graphDataMerged = objectAssignDeep(Object.assign({}, DEFAULT_GRAPH_DATA_BCG), graphData);
        this.drawChart();
    }
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
                Math.round(max(this.graphDataMerged.data, (data) => data.x_data))
            ])
                .range([0, this.width]);
            this.y = scaleLinear()
                .domain([
                0,
                max(this.graphDataMerged.data, (data) => data.y_data)
            ])
                .range([this.height, 0]);
            this.drawAxis();
            this.drawGrid();
            this.drawQuadrants();
            this.drawBubbles();
        }
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
            .attr('transform', `translate(${this.graphDataMerged.bcgMatrixChartOption.margin.left}, ${this.graphDataMerged.bcgMatrixChartOption.margin.top})`);
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
                .call(axisLeft(this.y).tickFormat(data => formatter(this.graphDataMerged.bcgMatrixChartOption.axis.y.format, data, this.graphDataMerged.bcgMatrixChartOption.axis.y.currency)));
        }
    }
    drawGrid() {
        if (this.graphDataMerged.bcgMatrixChartOption.axis.x.gridVisible) {
            this.root
                .append('g')
                .attr('class', 'grid')
                .call(axisBottom(this.x)
                .tickSize(this.height)
                .tickFormat(''));
        }
        if (this.graphDataMerged.bcgMatrixChartOption.axis.y.gridVisible) {
            this.root
                .append('g')
                .attr('class', 'grid')
                .call(axisLeft(this.y)
                .tickSize(-this.width)
                .tickFormat(''));
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
        const bubble = pack$1(this.dataSet)
            .size([
            this.width -
                (this.graphDataMerged.bcgMatrixChartOption.margin.left +
                    this.graphDataMerged.bcgMatrixChartOption.margin.right) *
                    2,
            this.height -
                (this.graphDataMerged.bcgMatrixChartOption.margin.top +
                    this.graphDataMerged.bcgMatrixChartOption.margin.bottom) *
                    2
        ])
            .padding(1.5);
        const nodes = hierarchy(this.dataSet).sum((data) => data.rel_size);
        const node = this.root
            .append('g')
            .attr('class', 'bubble-group')
            .selectAll('.bubble')
            .data(bubble(nodes).descendants())
            .enter()
            .filter(data => !data.children)
            .append('g')
            .attr('class', 'bubble')
            .on('mousemove', ({ data }) => this.eventsTooltip({ data, isToShow: true }))
            .on('mouseout', () => this.eventsTooltip({ isToShow: false }));
        node
            .filter(data => data.r > 0)
            .append('circle')
            .attr('cx', ({ data }) => this.x(data.x_data))
            .attr('cy', ({ data }) => this.y(data.y_data))
            .attr('r', data => data.r)
            .style('fill', ({ data }) => data.color)
            .style('opacity', this.bubbleOptions.opacity);
        node
            .filter(data => data.r > 0)
            .append('rect')
            .attr('width', data => data.r * 2 + this.bubbleOptions.padding)
            .attr('height', this.bubbleOptions.height)
            .attr('x', data => this.x(data.data.x_data) - data.r - this.bubbleOptions.padding / 2)
            .attr('y', data => this.y(data.data.y_data) - this.bubbleOptions.fontSize)
            .attr('stroke', ({ data }) => data.color)
            .attr('stroke-width', 1)
            .attr('fill', '#FFFFFF');
        node
            .filter(data => data.r > 0)
            .append('text')
            .attr('dx', ({ data }) => this.x(data.x_data))
            .attr('dy', ({ data }) => this.y(data.y_data))
            .style('text-anchor', 'middle')
            .text(({ data }) => data.label)
            .attr('font-size', this.bubbleOptions.fontSize)
            .attr('fill', '#000000');
    }
    eventsTooltip({ data, isToShow }) {
        const toShow = () => {
            this.tooltipEl.show(`${data.tooltipInfo}`, [event.pageX, event.pageY]);
        };
        const toHide = () => this.tooltipEl.hide();
        if (this.tooltipEl) {
            isToShow ? toShow() : toHide();
        }
    }
    eventsLegend(data) {
        console.log(data);
    }
    render() {
        return (h("div", { class: "o-layout" },
            h("div", { class: "o-layout--chart" },
                h("svg", { style: this.graphDataMerged.styles })),
            h("div", { class: "o-layout--slot" },
                h("slot", { name: "tooltip" }),
                h("slot", { name: "legend" }))));
    }
    static get is() { return "bcg-matrix-chart"; }
    static get properties() { return {
        "bgcMatrixChartEl": {
            "elementRef": true
        },
        "graphData": {
            "type": "Any",
            "attr": "graph-data"
        },
        "updateGraphData": {
            "method": true
        }
    }; }
    static get style() { return ".o-layout {\n  width: 100%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap; }\n  .o-layout--chart {\n    width: 100%; }\n    .is--vertical .o-layout--chart {\n      width: 90%; }\n  .o-layout--slot {\n    width: 100%; }\n    .is--vertical .o-layout--slot {\n      width: 10%;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-pack: center;\n      -ms-flex-pack: center;\n      justify-content: center;\n      -webkit-box-align: center;\n      -ms-flex-align: center;\n      align-items: center; }\n\nbcg-matrix-chart .quadrants line,\nbcg-matrix-chart .grid line {\n  stroke: lightgrey;\n  stroke-opacity: 0.7;\n  shape-rendering: crispEdges; }\n\nbcg-matrix-chart .quadrants path,\nbcg-matrix-chart .grid path {\n  stroke-width: 0; }\n\nbcg-matrix-chart .bubble text {\n  cursor: default; }"; }
}
__decorate([
    resize()
], BGCMatrixChart.prototype, "drawChart", null);

var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
class HorizontalBarChart {
    componentWillLoad() {
        this.graphDataMerged = objectAssignDeep(Object.assign({}, DEFAULT_GRAPH_DATA_BAR), this.graphData);
    }
    componentDidLoad() {
        this.svg = select(this.horizontalBarChartEl.getElementsByTagName('svg')[0]);
        this.height =
            this.svg.node().getBoundingClientRect().height -
                this.graphDataMerged.barChartOptions.margin.top -
                this.graphDataMerged.barChartOptions.margin.bottom;
        this.tooltipEl = initTooltipIfExists(this.horizontalBarChartEl, 'tooltip').component;
        this.legendEl = initLegendIfExists(this.horizontalBarChartEl, 'legend', this.eventsLegend.bind(this)).component;
        this.drawChart();
    }
    updateGraphData(graphData) {
        this.graphDataMerged = objectAssignDeep(Object.assign({}, DEFAULT_GRAPH_DATA_BAR), graphData);
        this.drawChart();
    }
    drawChart() {
        if (this.hasData()) {
            this.reSetRoot();
            this.width =
                this.svg.node().getBoundingClientRect().width -
                    this.graphDataMerged.barChartOptions.margin.left -
                    this.graphDataMerged.barChartOptions.margin.right;
            const originalGraphData = this.graphDataMerged.data[0];
            const maxValue = max(originalGraphData, data => data);
            this.x = scaleLinear()
                .domain([0, Math.ceil(maxValue / 100) * 100])
                .range([0, this.width]);
            this.y = scaleBand()
                .domain(originalGraphData.map((_, index) => this.graphDataMerged.labels[index]))
                .range([this.height, 0])
                .padding(0.1);
            this.drawAxis();
            this.drawGrid();
            this.drawBars();
        }
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
            .attr('transform', `translate(${this.graphDataMerged.barChartOptions.margin.left}, ${this.graphDataMerged.barChartOptions.margin.top})`);
    }
    drawAxis() {
        if (this.graphDataMerged.barChartOptions.axis.x.visible) {
            this.root
                .append('g')
                .attr('class', 'x axis')
                .attr('transform', `translate(0, ${this.height})`)
                .call(axisBottom(this.x).tickFormat(data => formatter(this.graphDataMerged.barChartOptions.axis.x.format, data, this.graphDataMerged.barChartOptions.axis.x.currency)));
        }
        if (this.graphDataMerged.barChartOptions.axis.y.visible) {
            this.root
                .append('g')
                .attr('class', 'y axis')
                .call(axisLeft(this.y));
        }
    }
    drawGrid() {
        if (this.graphDataMerged.barChartOptions.axis.x.gridVisible) {
            this.root
                .append('g')
                .attr('class', 'grid')
                .call(axisBottom(this.x)
                .tickSize(this.height)
                .tickFormat(''));
        }
        if (this.graphDataMerged.barChartOptions.axis.y.gridVisible) {
            this.root
                .append('g')
                .attr('class', 'grid')
                .call(axisLeft(this.y)
                .tickSize(-this.width)
                .tickFormat(''));
        }
    }
    drawBars() {
        this.root
            .append('g')
            .attr('class', 'bar-group')
            .selectAll('.bar')
            .data(this.graphDataMerged.data[0])
            .enter()
            .filter(data => this.x(data) > 0)
            .append('rect')
            .attr('class', 'bar')
            .attr('x', 0)
            .attr('height', this.y.bandwidth())
            .attr('y', (_, index) => this.y(this.graphDataMerged.labels[index]))
            .attr('width', data => this.x(data))
            .attr('fill', (_, index) => circularFind(this.graphDataMerged.colors, index))
            .on('mousemove', (data, index) => this.eventsTooltip({ data, index, isToShow: true }))
            .on('mouseout', () => this.eventsTooltip({ isToShow: false }));
    }
    eventsTooltip({ data, index, isToShow }) {
        const toShow = () => {
            this.tooltipEl.show(`${formatter(this.graphDataMerged.barChartOptions.axis.x.format, data, this.graphDataMerged.barChartOptions.axis.x.currency)} <br/> ${this.graphDataMerged.labels[index]}`, [event.pageX, event.pageY]);
        };
        const toHide = () => this.tooltipEl.hide();
        if (this.tooltipEl) {
            isToShow ? toShow() : toHide();
        }
    }
    eventsLegend(data) {
        console.log(data);
    }
    render() {
        return (h("div", { class: "o-layout is--vertical" },
            h("div", { class: "o-layout--chart" },
                h("svg", { style: this.graphDataMerged.styles })),
            h("div", { class: "o-layout--slot" },
                h("slot", { name: "tooltip" }),
                h("slot", { name: "legend" }))));
    }
    static get is() { return "horizontal-bar-chart"; }
    static get properties() { return {
        "graphData": {
            "type": "Any",
            "attr": "graph-data"
        },
        "horizontalBarChartEl": {
            "elementRef": true
        },
        "updateGraphData": {
            "method": true
        }
    }; }
    static get style() { return ".o-layout {\n  width: 100%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap; }\n  .o-layout--chart {\n    width: 100%; }\n    .is--vertical .o-layout--chart {\n      width: 90%; }\n  .o-layout--slot {\n    width: 100%; }\n    .is--vertical .o-layout--slot {\n      width: 10%;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-pack: center;\n      -ms-flex-pack: center;\n      justify-content: center;\n      -webkit-box-align: center;\n      -ms-flex-align: center;\n      align-items: center; }\n\nhorizontal-bar-chart .grid line {\n  stroke: lightgrey;\n  stroke-opacity: 0.7;\n  shape-rendering: crispEdges; }\n\nhorizontal-bar-chart .grid path {\n  stroke-width: 0; }"; }
}
__decorate$1([
    resize()
], HorizontalBarChart.prototype, "drawChart", null);

class LegendChart {
    constructor() {
        this.labelLegendPosition = 0;
    }
    componentWillLoad() {
        this.legendDataMerged = objectAssignDeep(Object.assign({}, DEFAULT_LEGEND_DATA), this.legendData);
    }
    componentDidLoad() {
        this.svg = select(this.legendEl.getElementsByTagName('svg')[0]);
        this.legendDataMerged.type === 'horizontal'
            ? this.drawHorizontalLegend()
            : this.drawVerticalLegend();
    }
    callOnClick(callOnClickChild) {
        this._callOnClick = callOnClickChild;
    }
    drawHorizontalLegend() {
        const horizontalLegendGroup = this.svg
            .selectAll('.legend')
            .data(this.legendDataMerged.labels)
            .enter()
            .append('g')
            .attr('class', 'legend');
        horizontalLegendGroup
            .append('circle')
            .attr('cx', 10)
            .attr('cy', 5)
            .attr('r', 7)
            .style('fill', (_, index) => circularFind(this.legendDataMerged.colors, index))
            .style('stroke', (_, index) => circularFind(this.legendDataMerged.colors, index))
            .on('click', (data, index) => this.handleOnClick(data, index));
        horizontalLegendGroup
            .append('text')
            .attr('x', 20)
            .attr('y', 10)
            .text(data => data);
        horizontalLegendGroup.attr('transform', (_, index) => this.makeTransformTranslate(horizontalLegendGroup, index));
    }
    drawVerticalLegend(offset = 20) {
        const legend = this.svg
            .selectAll('.legend')
            .data(this.legendDataMerged.labels)
            .enter()
            .append('g')
            .attr('class', 'legend')
            .attr('transform', (_, index) => `translate(0, ${index * offset})`);
        legend
            .append('circle')
            .attr('cx', 10)
            .attr('cy', 10)
            .attr('r', 7)
            .style('fill', (_, index) => circularFind(this.legendDataMerged.colors, index))
            .style('stroke', (_, index) => circularFind(this.legendDataMerged.colors, index))
            .on('click', (data, index) => this.handleOnClick(data, index));
        legend
            .append('text')
            .attr('x', 20)
            .attr('y', 15)
            .text((data) => data);
    }
    makeTransformTranslate(group, index, offset = 20) {
        const TY = 5;
        let TX = 0;
        if (index === 0) {
            this.labelLegendPosition = group.nodes()[index].getBBox().width + offset;
        }
        else {
            TX = this.labelLegendPosition;
            this.labelLegendPosition += group.nodes()[index].getBBox().width + offset;
        }
        return `translate(${TX}, ${TY})`;
    }
    handleOnClick(label, index) {
        const circleElement = select(event.target);
        const textElement = select(event.target.nextSibling);
        circleElement.classed('is__inactive', !textElement.classed('is__inactive'));
        textElement.classed('is__inactive', !textElement.classed('is__inactive'));
        return this._callOnClick({ label, index });
    }
    render() {
        return h("svg", { class: "legend", style: this.legendDataMerged.styles });
    }
    static get is() { return "legend-chart"; }
    static get properties() { return {
        "callOnClick": {
            "method": true
        },
        "legendData": {
            "type": "Any",
            "attr": "legend-data"
        },
        "legendEl": {
            "elementRef": true
        }
    }; }
    static get style() { return ".o-layout {\n  width: 100%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap; }\n  .o-layout--chart {\n    width: 100%; }\n    .is--vertical .o-layout--chart {\n      width: 90%; }\n  .o-layout--slot {\n    width: 100%; }\n    .is--vertical .o-layout--slot {\n      width: 10%;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-pack: center;\n      -ms-flex-pack: center;\n      justify-content: center;\n      -webkit-box-align: center;\n      -ms-flex-align: center;\n      align-items: center; }\n\nlegend-chart .legend circle {\n  cursor: pointer;\n  stroke-width: 2px; }\n  legend-chart .legend circle.is__inactive {\n    fill: #FFFFFF !important; }\n\nlegend-chart .legend text {\n  text-anchor: start;\n  font-size: 15px; }\n  legend-chart .legend text.is__inactive {\n    text-decoration: line-through; }"; }
}

var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
class LineAnnotationsChart {
    lineChartRenderedHandle() {
        this.lineChartAreReady();
    }
    componentWillLoad() {
        this.graphDataMerged = objectAssignDeep(Object.assign({}, DEFAULT_GRAPH_DATA_LINE), this.graphData);
    }
    updateGraphData(graphData) {
        this.graphDataMerged = objectAssignDeep(Object.assign({}, DEFAULT_GRAPH_DATA_LINE), graphData);
        this.lineChartEl.updateGraphData(this.graphDataMerged);
        this.drawChart();
    }
    lineChartAreReady() {
        this.lineChartEl = this.lineAnnotationsChartEl.getElementsByTagName('line-chart')[0];
        this.svg = select(this.lineChartEl.getElementsByTagName('svg')[0]);
        this.height =
            this.svg.node().getBoundingClientRect().height -
                this.graphDataMerged.lineChartOptions.margin.top -
                this.graphDataMerged.lineChartOptions.margin.bottom;
        this.svg.style('height', this.svg.node().getBoundingClientRect().height +
            this.graphDataMerged.lineAnnotationsChartOptions.increaseHeight);
        this.drawChart();
    }
    drawChart() {
        if (this.hasData()) {
            this.reSetRoot();
            this.width =
                this.svg.node().getBoundingClientRect().width -
                    this.graphDataMerged.lineChartOptions.margin.left -
                    this.graphDataMerged.lineChartOptions.margin.right;
            const originalGraphData = this.graphDataMerged.data;
            const allDataValues = originalGraphData.reduce((acc, data) => (acc = [...acc, ...data]), []);
            this.x = scaleOrdinal()
                .domain(allDataValues)
                .range(allDataValues.map((_, index) => index * (this.width / (originalGraphData[0].length - 1))));
            this.repositionXAxis();
            this.drawAnnotations();
        }
    }
    hasData() {
        return this.graphDataMerged.lineAnnotationsChartOptions.hasDataMethod(this.graphDataMerged);
    }
    reSetRoot() {
        this.root = select(this.lineAnnotationsChartEl.getElementsByTagName('line-chart')[0]
            .children[0]);
        this.annotationsGroup ? this.annotationsGroup.remove() : null;
    }
    repositionXAxis() {
        this.root
            .selectAll('.x text')
            .attr('dy', this.graphDataMerged.lineAnnotationsChartOptions.tickSeparation);
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
            .filter((data) => data.length > 0)
            .append('svg:image')
            .attr('y', 7)
            .attr('x', -7)
            .attr('width', data => (data.length > 1 ? 20 : 17))
            .attr('height', data => (data.length > 1 ? 20 : 17))
            .attr('xlink:href', data => data.length > 1
            ? this.graphDataMerged.lineAnnotationsChartOptions
                .imagePathSomeAnnotations
            : this.graphDataMerged.lineAnnotationsChartOptions
                .imagePathSomeAnnotations)
            .on('mouseover', () => this.strokedashAnnotations(true))
            .on('mouseleave', () => this.strokedashAnnotations(false));
    }
    strokedashAnnotations(isMouseOver = false) {
        const position = select(event.target).node().parentNode.attributes.data
            .nodeValue;
        const stylesGuideLineAnnotation = {
            style: ['style', 'stroke: #0283B0; stroke-width: 3'],
            strokeDasharray: ['stroke-dasharray', '5,5']
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
                .attr(stylesGuideLineAnnotation.style[0], stylesGuideLineAnnotation.style[1])
                .attr(stylesGuideLineAnnotation.strokeDasharray[0], stylesGuideLineAnnotation.strokeDasharray[1]);
        }
        else {
            this.root.select('.strokedash').remove();
        }
    }
    render() {
        return h("line-chart", { graphData: this.graphDataMerged });
    }
    static get is() { return "line-annotations-chart"; }
    static get properties() { return {
        "graphData": {
            "type": "Any",
            "attr": "graph-data"
        },
        "lineAnnotationsChartEl": {
            "elementRef": true
        },
        "updateGraphData": {
            "method": true
        }
    }; }
    static get listeners() { return [{
            "name": "lineChartRendered",
            "method": "lineChartRenderedHandle"
        }]; }
    static get style() { return ".o-layout {\n  width: 100%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap; }\n  .o-layout--chart {\n    width: 100%; }\n    .is--vertical .o-layout--chart {\n      width: 90%; }\n  .o-layout--slot {\n    width: 100%; }\n    .is--vertical .o-layout--slot {\n      width: 10%;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-pack: center;\n      -ms-flex-pack: center;\n      justify-content: center;\n      -webkit-box-align: center;\n      -ms-flex-align: center;\n      align-items: center; }\n\nline-annotations-chart .annotations-group .annotation {\n  cursor: pointer; }"; }
}
__decorate$2([
    resize()
], LineAnnotationsChart.prototype, "drawChart", null);

class App {
    constructor() {
        this.GRAPH_DATA_PIE = {
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
        this.LEGEND_DATA_PIE = {
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
        this.GRAPH_DATA_BAR = {
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
        this.LEGEND_DATA_BAR = {
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
        this.GRAPH_DATA_PROGRESS_BAR = {
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
        this.GRAPH_DATA_LINE = {
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
        this.GRAPH_DATA_LINE_ANNOTATION = {
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
        this.LEGEND_DATA_LINE = {
            labels: ['14-17', '18-24'],
            colors: ['#98abc5', '#8a89a6'],
            type: 'horizontal'
        };
        this.GRAPH_DATA_BCG = {
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
    }
    render() {
        return (h("div", null,
            h("header", null,
                h("stencil-route-link", { url: "/" },
                    h("h1", null, "Stencil Graphs | API Reference"))),
            h("main", null,
                h("h1", null, "Pie Chart:"),
                h("pie-chart", { graphData: this.GRAPH_DATA_PIE },
                    h("tooltip-chart", { slot: "tooltip" }),
                    h("legend-chart", { slot: "legend", legendData: this.LEGEND_DATA_PIE })),
                h("div", { class: "example" },
                    h("pre", { class: "language-tsx" },
                        h("code", { class: "language-tsx" }, JSON.stringify(this.GRAPH_DATA_PIE, null, 2)))),
                h("h1", null, "Horizontal Bar Chart:"),
                h("horizontal-bar-chart", { graphData: this.GRAPH_DATA_BAR },
                    h("tooltip-chart", { slot: "tooltip" }),
                    h("legend-chart", { slot: "legend", legendData: this.LEGEND_DATA_BAR })),
                h("div", { class: "example" },
                    h("pre", { class: "language-tsx" },
                        h("code", { class: "language-tsx" }, JSON.stringify(this.GRAPH_DATA_BAR, null, 2)))),
                h("h3", null, "Extra: Progress bar"),
                h("horizontal-bar-chart", { graphData: this.GRAPH_DATA_PROGRESS_BAR, class: "progress-bar" }),
                h("div", { class: "example" },
                    h("pre", { class: "language-tsx" },
                        h("code", { class: "language-tsx" }, JSON.stringify(this.GRAPH_DATA_PROGRESS_BAR, null, 2)))),
                h("h1", null, "Line Chart:"),
                h("line-chart", { graphData: this.GRAPH_DATA_LINE },
                    h("tooltip-chart", { slot: "tooltip" }),
                    h("legend-chart", { slot: "legend", legendData: this.LEGEND_DATA_LINE })),
                h("div", { class: "example" },
                    h("pre", { class: "language-tsx" },
                        h("code", { class: "language-tsx" }, JSON.stringify(this.GRAPH_DATA_LINE, null, 2)))),
                h("h1", null, "Annotations Line Chart:"),
                h("line-annotations-chart", { graphData: this.GRAPH_DATA_LINE_ANNOTATION }),
                h("div", { class: "example" },
                    h("pre", { class: "language-tsx" },
                        h("code", { class: "language-tsx" }, JSON.stringify(this.GRAPH_DATA_LINE_ANNOTATION, null, 2)))),
                h("h1", null, "BCG Matrix Chart:"),
                h("bcg-matrix-chart", { graphData: this.GRAPH_DATA_BCG },
                    h("tooltip-chart", { slot: "tooltip", align: 'left' })),
                h("div", { class: "example" },
                    h("pre", { class: "language-tsx" },
                        h("code", { class: "language-tsx" }, JSON.stringify(this.GRAPH_DATA_BCG, null, 2)))))));
    }
    static get is() { return "my-app"; }
    static get style() { return ".o-layout {\n  width: 100%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap; }\n  .o-layout--chart {\n    width: 100%; }\n    .is--vertical .o-layout--chart {\n      width: 90%; }\n  .o-layout--slot {\n    width: 100%; }\n    .is--vertical .o-layout--slot {\n      width: 10%;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-pack: center;\n      -ms-flex-pack: center;\n      justify-content: center;\n      -webkit-box-align: center;\n      -ms-flex-align: center;\n      align-items: center; }\n\nmy-app header {\n  background: #5851ff;\n  color: white;\n  height: 3.5rem;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-box-shadow: 0 0.125rem 0.3125rem 0 rgba(0, 0, 0, 0.26);\n  box-shadow: 0 0.125rem 0.3125rem 0 rgba(0, 0, 0, 0.26); }\n  my-app header h1 {\n    font-size: 1.4rem;\n    font-weight: 500;\n    padding: 0 0.75rem; }\n  my-app header a {\n    color: #ffffff;\n    margin: .4rem;\n    text-decoration: none; }\n\nmy-app main {\n  margin: 6.25rem; }\n  my-app main .progress-bar svg {\n    border: 1px solid lightgrey; }\n  my-app main .example {\n    margin: 6.25rem 0;\n    max-height: 50vh;\n    overflow-y: scroll; }"; }
}

var __decorate$3 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
class PieChart {
    componentWillLoad() {
        this.graphDataMerged = objectAssignDeep(Object.assign({}, DEFAULT_GRAPH_DATA_PIE), this.graphData);
    }
    componentDidLoad() {
        this.svg = select(this.pieChartEl.getElementsByTagName('svg')[0]);
        this.height = this.svg.node().getBoundingClientRect().height;
        this.tooltipEl = initTooltipIfExists(this.pieChartEl, 'tooltip').component;
        this.legendEl = initLegendIfExists(this.pieChartEl, 'legend', this.eventsLegend.bind(this)).component;
        this.drawChart();
    }
    updateGraphData(graphData) {
        this.graphDataMerged = objectAssignDeep(Object.assign({}, DEFAULT_GRAPH_DATA_PIE), graphData);
        this.drawChart();
    }
    drawChart() {
        if (this.hasData()) {
            this.width = this.svg.node().getBoundingClientRect().width;
            this.radius = Math.min(this.width, this.height) / 2;
            this.reSetRoot();
            const circularArc = arc()
                .innerRadius(0)
                .outerRadius(this.radius);
            this.pie = this.root
                .selectAll('.arc')
                .data(pie()
                .sort(null)
                .value(data => data)(this.graphDataMerged.data[0]))
                .enter()
                .append('g')
                .attr('class', 'arc');
            this.pie
                .append('path')
                .attr('d', circularArc)
                .attr('stroke', '#FFF')
                .attr('fill', (_, index) => circularFind(this.graphDataMerged.colors, index))
                .on('mousemove', data => this.eventsTooltip({ data, isToShow: true }))
                .on('mouseout', () => this.eventsTooltip({ isToShow: false }));
            this.createLabels();
        }
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
            .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`);
    }
    createLabels() {
        this.labelArc = arc()
            .innerRadius(this.radius - 40)
            .outerRadius(this.radius - 40);
        this.pie
            .append('text')
            .attr('transform', data => `translate(${this.labelArc.centroid(data)})`)
            .attr('dy', '0.35em')
            .text((_, index) => formatter(this.graphDataMerged.pieChartOptions.labelFormat, this.graphDataMerged.labels[index], this.graphDataMerged.pieChartOptions.currency));
    }
    eventsTooltip({ data, isToShow }) {
        const toShow = () => {
            this.tooltipEl.show(`${formatter(this.graphDataMerged.pieChartOptions.dataFormat, data.data, this.graphDataMerged.pieChartOptions.currency)} <br/>
        ${formatter(this.graphDataMerged.pieChartOptions.labelFormat, this.graphDataMerged.labels[data.index], this.graphDataMerged.pieChartOptions.currency)}`, [event.pageX, event.pageY]);
        };
        const toHide = () => this.tooltipEl.hide();
        if (this.tooltipEl) {
            isToShow ? toShow() : toHide();
        }
    }
    eventsLegend(data) {
        const currentLabels = this.graphDataMerged.labels;
        const currentData = this.graphDataMerged.data[0];
        const tempLabels = currentLabels.filter(label => label !== data.label);
        const tempData = currentData.filter((_, index) => index !== data.index);
        if (currentLabels.length === tempLabels.length) {
            this.graphDataMerged.labels = this.graphData.labels;
            this.graphDataMerged.data = this.graphData.data;
            this.graphDataMerged.colors = this.graphData.colors;
            this.updateGraphData(this.graphDataMerged);
        }
        else {
            this.graphDataMerged.labels = tempLabels;
            this.graphDataMerged.data[0] = tempData;
            this.graphDataMerged.colors.splice(data.index, 1);
            this.updateGraphData(this.graphDataMerged);
        }
    }
    render() {
        return (h("div", { class: "o-layout is--vertical" },
            h("div", { class: "o-layout--chart" },
                h("svg", { style: this.graphDataMerged.styles })),
            h("div", { class: "o-layout--slot" },
                h("slot", { name: "tooltip" }),
                h("slot", { name: "legend" }))));
    }
    static get is() { return "pie-chart"; }
    static get properties() { return {
        "graphData": {
            "type": "Any",
            "attr": "graph-data"
        },
        "pieChartEl": {
            "elementRef": true
        },
        "updateGraphData": {
            "method": true
        }
    }; }
    static get style() { return ".o-layout {\n  width: 100%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap; }\n  .o-layout--chart {\n    width: 100%; }\n    .is--vertical .o-layout--chart {\n      width: 90%; }\n  .o-layout--slot {\n    width: 100%; }\n    .is--vertical .o-layout--slot {\n      width: 10%;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-pack: center;\n      -ms-flex-pack: center;\n      justify-content: center;\n      -webkit-box-align: center;\n      -ms-flex-align: center;\n      align-items: center; }\n\npie-chart .arc text {\n  font: 0.625rem sans-serif;\n  text-anchor: middle;\n  cursor: default; }"; }
}
__decorate$3([
    resize()
], PieChart.prototype, "drawChart", null);

var noop = {value: function() {}};

function dispatch() {
  for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
    if (!(t = arguments[i] + "") || (t in _)) throw new Error("illegal type: " + t);
    _[t] = [];
  }
  return new Dispatch(_);
}

function Dispatch(_) {
  this._ = _;
}

function parseTypenames(typenames, types) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    return {type: t, name: name};
  });
}

Dispatch.prototype = dispatch.prototype = {
  constructor: Dispatch,
  on: function(typename, callback) {
    var _ = this._,
        T = parseTypenames(typename + "", _),
        t,
        i = -1,
        n = T.length;

    // If no callback was specified, return the callback of the given type and name.
    if (arguments.length < 2) {
      while (++i < n) if ((t = (typename = T[i]).type) && (t = get(_[t], typename.name))) return t;
      return;
    }

    // If a type was specified, set the callback for the given type and name.
    // Otherwise, if a null callback was specified, remove callbacks of the given name.
    if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
    while (++i < n) {
      if (t = (typename = T[i]).type) _[t] = set(_[t], typename.name, callback);
      else if (callback == null) for (t in _) _[t] = set(_[t], typename.name, null);
    }

    return this;
  },
  copy: function() {
    var copy = {}, _ = this._;
    for (var t in _) copy[t] = _[t].slice();
    return new Dispatch(copy);
  },
  call: function(type, that) {
    if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
    for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  },
  apply: function(type, that, args) {
    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
    for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  }
};

function get(type, name) {
  for (var i = 0, n = type.length, c; i < n; ++i) {
    if ((c = type[i]).name === name) {
      return c.value;
    }
  }
}

function set(type, name, callback) {
  for (var i = 0, n = type.length; i < n; ++i) {
    if (type[i].name === name) {
      type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
      break;
    }
  }
  if (callback != null) type.push({name: name, value: callback});
  return type;
}

var frame = 0, // is an animation frame pending?
    timeout = 0, // is a timeout pending?
    interval = 0, // are any timers active?
    pokeDelay = 1000, // how frequently we check for clock skew
    taskHead,
    taskTail,
    clockLast = 0,
    clockNow = 0,
    clockSkew = 0,
    clock = typeof performance === "object" && performance.now ? performance : Date,
    setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) { setTimeout(f, 17); };

function now() {
  return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
}

function clearNow() {
  clockNow = 0;
}

function Timer() {
  this._call =
  this._time =
  this._next = null;
}

Timer.prototype = timer.prototype = {
  constructor: Timer,
  restart: function(callback, delay, time) {
    if (typeof callback !== "function") throw new TypeError("callback is not a function");
    time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
    if (!this._next && taskTail !== this) {
      if (taskTail) taskTail._next = this;
      else taskHead = this;
      taskTail = this;
    }
    this._call = callback;
    this._time = time;
    sleep();
  },
  stop: function() {
    if (this._call) {
      this._call = null;
      this._time = Infinity;
      sleep();
    }
  }
};

function timer(callback, delay, time) {
  var t = new Timer;
  t.restart(callback, delay, time);
  return t;
}

function timerFlush() {
  now(); // Get the current time, if not already set.
  ++frame; // Pretend we’ve set an alarm, if we haven’t already.
  var t = taskHead, e;
  while (t) {
    if ((e = clockNow - t._time) >= 0) t._call.call(null, e);
    t = t._next;
  }
  --frame;
}

function wake() {
  clockNow = (clockLast = clock.now()) + clockSkew;
  frame = timeout = 0;
  try {
    timerFlush();
  } finally {
    frame = 0;
    nap();
    clockNow = 0;
  }
}

function poke() {
  var now = clock.now(), delay = now - clockLast;
  if (delay > pokeDelay) clockSkew -= delay, clockLast = now;
}

function nap() {
  var t0, t1 = taskHead, t2, time = Infinity;
  while (t1) {
    if (t1._call) {
      if (time > t1._time) time = t1._time;
      t0 = t1, t1 = t1._next;
    } else {
      t2 = t1._next, t1._next = null;
      t1 = t0 ? t0._next = t2 : taskHead = t2;
    }
  }
  taskTail = t0;
  sleep(time);
}

function sleep(time) {
  if (frame) return; // Soonest alarm already set, or will be.
  if (timeout) timeout = clearTimeout(timeout);
  var delay = time - clockNow; // Strictly less than if we recomputed clockNow.
  if (delay > 24) {
    if (time < Infinity) timeout = setTimeout(wake, time - clock.now() - clockSkew);
    if (interval) interval = clearInterval(interval);
  } else {
    if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
    frame = 1, setFrame(wake);
  }
}

function timeout$1(callback, delay, time) {
  var t = new Timer;
  delay = delay == null ? 0 : +delay;
  t.restart(function(elapsed) {
    t.stop();
    callback(elapsed + delay);
  }, delay, time);
  return t;
}

var emptyOn = dispatch("start", "end", "interrupt");
var emptyTween = [];

var CREATED = 0;
var SCHEDULED = 1;
var STARTING = 2;
var STARTED = 3;
var RUNNING = 4;
var ENDING = 5;
var ENDED = 6;

function schedule(node, name, id, index, group, timing) {
  var schedules = node.__transition;
  if (!schedules) node.__transition = {};
  else if (id in schedules) return;
  create(node, id, {
    name: name,
    index: index, // For context during callback.
    group: group, // For context during callback.
    on: emptyOn,
    tween: emptyTween,
    time: timing.time,
    delay: timing.delay,
    duration: timing.duration,
    ease: timing.ease,
    timer: null,
    state: CREATED
  });
}

function init(node, id) {
  var schedule = get$1(node, id);
  if (schedule.state > CREATED) throw new Error("too late; already scheduled");
  return schedule;
}

function set$1(node, id) {
  var schedule = get$1(node, id);
  if (schedule.state > STARTING) throw new Error("too late; already started");
  return schedule;
}

function get$1(node, id) {
  var schedule = node.__transition;
  if (!schedule || !(schedule = schedule[id])) throw new Error("transition not found");
  return schedule;
}

function create(node, id, self) {
  var schedules = node.__transition,
      tween;

  // Initialize the self timer when the transition is created.
  // Note the actual delay is not known until the first callback!
  schedules[id] = self;
  self.timer = timer(schedule, 0, self.time);

  function schedule(elapsed) {
    self.state = SCHEDULED;
    self.timer.restart(start, self.delay, self.time);

    // If the elapsed delay is less than our first sleep, start immediately.
    if (self.delay <= elapsed) start(elapsed - self.delay);
  }

  function start(elapsed) {
    var i, j, n, o;

    // If the state is not SCHEDULED, then we previously errored on start.
    if (self.state !== SCHEDULED) return stop();

    for (i in schedules) {
      o = schedules[i];
      if (o.name !== self.name) continue;

      // While this element already has a starting transition during this frame,
      // defer starting an interrupting transition until that transition has a
      // chance to tick (and possibly end); see d3/d3-transition#54!
      if (o.state === STARTED) return timeout$1(start);

      // Interrupt the active transition, if any.
      // Dispatch the interrupt event.
      if (o.state === RUNNING) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("interrupt", node, node.__data__, o.index, o.group);
        delete schedules[i];
      }

      // Cancel any pre-empted transitions. No interrupt event is dispatched
      // because the cancelled transitions never started. Note that this also
      // removes this transition from the pending list!
      else if (+i < id) {
        o.state = ENDED;
        o.timer.stop();
        delete schedules[i];
      }
    }

    // Defer the first tick to end of the current frame; see d3/d3#1576.
    // Note the transition may be canceled after start and before the first tick!
    // Note this must be scheduled before the start event; see d3/d3-transition#16!
    // Assuming this is successful, subsequent callbacks go straight to tick.
    timeout$1(function() {
      if (self.state === STARTED) {
        self.state = RUNNING;
        self.timer.restart(tick, self.delay, self.time);
        tick(elapsed);
      }
    });

    // Dispatch the start event.
    // Note this must be done before the tween are initialized.
    self.state = STARTING;
    self.on.call("start", node, node.__data__, self.index, self.group);
    if (self.state !== STARTING) return; // interrupted
    self.state = STARTED;

    // Initialize the tween, deleting null tween.
    tween = new Array(n = self.tween.length);
    for (i = 0, j = -1; i < n; ++i) {
      if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) {
        tween[++j] = o;
      }
    }
    tween.length = j + 1;
  }

  function tick(elapsed) {
    var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = ENDING, 1),
        i = -1,
        n = tween.length;

    while (++i < n) {
      tween[i].call(null, t);
    }

    // Dispatch the end event.
    if (self.state === ENDING) {
      self.on.call("end", node, node.__data__, self.index, self.group);
      stop();
    }
  }

  function stop() {
    self.state = ENDED;
    self.timer.stop();
    delete schedules[id];
    for (var i in schedules) return; // eslint-disable-line no-unused-vars
    delete node.__transition;
  }
}

function interrupt(node, name) {
  var schedules = node.__transition,
      schedule$$1,
      active,
      empty = true,
      i;

  if (!schedules) return;

  name = name == null ? null : name + "";

  for (i in schedules) {
    if ((schedule$$1 = schedules[i]).name !== name) { empty = false; continue; }
    active = schedule$$1.state > STARTING && schedule$$1.state < ENDING;
    schedule$$1.state = ENDED;
    schedule$$1.timer.stop();
    if (active) schedule$$1.on.call("interrupt", node, node.__data__, schedule$$1.index, schedule$$1.group);
    delete schedules[i];
  }

  if (empty) delete node.__transition;
}

function selection_interrupt(name) {
  return this.each(function() {
    interrupt(this, name);
  });
}

function tweenRemove(id, name) {
  var tween0, tween1;
  return function() {
    var schedule$$1 = set$1(this, id),
        tween = schedule$$1.tween;

    // If this node shared tween with the previous node,
    // just assign the updated shared tween and we’re done!
    // Otherwise, copy-on-write.
    if (tween !== tween0) {
      tween1 = tween0 = tween;
      for (var i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1 = tween1.slice();
          tween1.splice(i, 1);
          break;
        }
      }
    }

    schedule$$1.tween = tween1;
  };
}

function tweenFunction(id, name, value) {
  var tween0, tween1;
  if (typeof value !== "function") throw new Error;
  return function() {
    var schedule$$1 = set$1(this, id),
        tween = schedule$$1.tween;

    // If this node shared tween with the previous node,
    // just assign the updated shared tween and we’re done!
    // Otherwise, copy-on-write.
    if (tween !== tween0) {
      tween1 = (tween0 = tween).slice();
      for (var t = {name: name, value: value}, i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1[i] = t;
          break;
        }
      }
      if (i === n) tween1.push(t);
    }

    schedule$$1.tween = tween1;
  };
}

function transition_tween(name, value) {
  var id = this._id;

  name += "";

  if (arguments.length < 2) {
    var tween = get$1(this.node(), id).tween;
    for (var i = 0, n = tween.length, t; i < n; ++i) {
      if ((t = tween[i]).name === name) {
        return t.value;
      }
    }
    return null;
  }

  return this.each((value == null ? tweenRemove : tweenFunction)(id, name, value));
}

function tweenValue(transition, name, value) {
  var id = transition._id;

  transition.each(function() {
    var schedule$$1 = set$1(this, id);
    (schedule$$1.value || (schedule$$1.value = {}))[name] = value.apply(this, arguments);
  });

  return function(node) {
    return get$1(node, id).value[name];
  };
}

function interpolate(a, b) {
  var c;
  return (typeof b === "number" ? interpolateNumber
      : b instanceof color ? interpolateRgb
      : (c = color(b)) ? (b = c, interpolateRgb)
      : interpolateString)(a, b);
}

function attrRemove(name) {
  return function() {
    this.removeAttribute(name);
  };
}

function attrRemoveNS(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}

function attrConstant(name, interpolate$$1, value1) {
  var value00,
      interpolate0;
  return function() {
    var value0 = this.getAttribute(name);
    return value0 === value1 ? null
        : value0 === value00 ? interpolate0
        : interpolate0 = interpolate$$1(value00 = value0, value1);
  };
}

function attrConstantNS(fullname, interpolate$$1, value1) {
  var value00,
      interpolate0;
  return function() {
    var value0 = this.getAttributeNS(fullname.space, fullname.local);
    return value0 === value1 ? null
        : value0 === value00 ? interpolate0
        : interpolate0 = interpolate$$1(value00 = value0, value1);
  };
}

function attrFunction(name, interpolate$$1, value) {
  var value00,
      value10,
      interpolate0;
  return function() {
    var value0, value1 = value(this);
    if (value1 == null) return void this.removeAttribute(name);
    value0 = this.getAttribute(name);
    return value0 === value1 ? null
        : value0 === value00 && value1 === value10 ? interpolate0
        : interpolate0 = interpolate$$1(value00 = value0, value10 = value1);
  };
}

function attrFunctionNS(fullname, interpolate$$1, value) {
  var value00,
      value10,
      interpolate0;
  return function() {
    var value0, value1 = value(this);
    if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
    value0 = this.getAttributeNS(fullname.space, fullname.local);
    return value0 === value1 ? null
        : value0 === value00 && value1 === value10 ? interpolate0
        : interpolate0 = interpolate$$1(value00 = value0, value10 = value1);
  };
}

function transition_attr(name, value) {
  var fullname = namespace(name), i = fullname === "transform" ? interpolateTransformSvg : interpolate;
  return this.attrTween(name, typeof value === "function"
      ? (fullname.local ? attrFunctionNS : attrFunction)(fullname, i, tweenValue(this, "attr." + name, value))
      : value == null ? (fullname.local ? attrRemoveNS : attrRemove)(fullname)
      : (fullname.local ? attrConstantNS : attrConstant)(fullname, i, value + ""));
}

function attrTweenNS(fullname, value) {
  function tween() {
    var node = this, i = value.apply(node, arguments);
    return i && function(t) {
      node.setAttributeNS(fullname.space, fullname.local, i(t));
    };
  }
  tween._value = value;
  return tween;
}

function attrTween(name, value) {
  function tween() {
    var node = this, i = value.apply(node, arguments);
    return i && function(t) {
      node.setAttribute(name, i(t));
    };
  }
  tween._value = value;
  return tween;
}

function transition_attrTween(name, value) {
  var key = "attr." + name;
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error;
  var fullname = namespace(name);
  return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
}

function delayFunction(id, value) {
  return function() {
    init(this, id).delay = +value.apply(this, arguments);
  };
}

function delayConstant(id, value) {
  return value = +value, function() {
    init(this, id).delay = value;
  };
}

function transition_delay(value) {
  var id = this._id;

  return arguments.length
      ? this.each((typeof value === "function"
          ? delayFunction
          : delayConstant)(id, value))
      : get$1(this.node(), id).delay;
}

function durationFunction(id, value) {
  return function() {
    set$1(this, id).duration = +value.apply(this, arguments);
  };
}

function durationConstant(id, value) {
  return value = +value, function() {
    set$1(this, id).duration = value;
  };
}

function transition_duration(value) {
  var id = this._id;

  return arguments.length
      ? this.each((typeof value === "function"
          ? durationFunction
          : durationConstant)(id, value))
      : get$1(this.node(), id).duration;
}

function easeConstant(id, value) {
  if (typeof value !== "function") throw new Error;
  return function() {
    set$1(this, id).ease = value;
  };
}

function transition_ease(value) {
  var id = this._id;

  return arguments.length
      ? this.each(easeConstant(id, value))
      : get$1(this.node(), id).ease;
}

function transition_filter(match) {
  if (typeof match !== "function") match = matcher(match);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }

  return new Transition(subgroups, this._parents, this._name, this._id);
}

function transition_merge(transition$$1) {
  if (transition$$1._id !== this._id) throw new Error;

  for (var groups0 = this._groups, groups1 = transition$$1._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }

  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }

  return new Transition(merges, this._parents, this._name, this._id);
}

function start(name) {
  return (name + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    if (i >= 0) t = t.slice(0, i);
    return !t || t === "start";
  });
}

function onFunction(id, name, listener) {
  var on0, on1, sit = start(name) ? init : set$1;
  return function() {
    var schedule$$1 = sit(this, id),
        on = schedule$$1.on;

    // If this node shared a dispatch with the previous node,
    // just assign the updated shared dispatch and we’re done!
    // Otherwise, copy-on-write.
    if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);

    schedule$$1.on = on1;
  };
}

function transition_on(name, listener) {
  var id = this._id;

  return arguments.length < 2
      ? get$1(this.node(), id).on.on(name)
      : this.each(onFunction(id, name, listener));
}

function removeFunction(id) {
  return function() {
    var parent = this.parentNode;
    for (var i in this.__transition) if (+i !== id) return;
    if (parent) parent.removeChild(this);
  };
}

function transition_remove() {
  return this.on("end.remove", removeFunction(this._id));
}

function transition_select(select$$1) {
  var name = this._name,
      id = this._id;

  if (typeof select$$1 !== "function") select$$1 = selector(select$$1);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select$$1.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
        schedule(subgroup[i], name, id, i, subgroup, get$1(node, id));
      }
    }
  }

  return new Transition(subgroups, this._parents, name, id);
}

function transition_selectAll(select$$1) {
  var name = this._name,
      id = this._id;

  if (typeof select$$1 !== "function") select$$1 = selectorAll(select$$1);

  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        for (var children = select$$1.call(node, node.__data__, i, group), child, inherit = get$1(node, id), k = 0, l = children.length; k < l; ++k) {
          if (child = children[k]) {
            schedule(child, name, id, k, children, inherit);
          }
        }
        subgroups.push(children);
        parents.push(node);
      }
    }
  }

  return new Transition(subgroups, parents, name, id);
}

var Selection = selection.prototype.constructor;

function transition_selection() {
  return new Selection(this._groups, this._parents);
}

function styleRemove(name, interpolate$$1) {
  var value00,
      value10,
      interpolate0;
  return function() {
    var value0 = styleValue(this, name),
        value1 = (this.style.removeProperty(name), styleValue(this, name));
    return value0 === value1 ? null
        : value0 === value00 && value1 === value10 ? interpolate0
        : interpolate0 = interpolate$$1(value00 = value0, value10 = value1);
  };
}

function styleRemoveEnd(name) {
  return function() {
    this.style.removeProperty(name);
  };
}

function styleConstant(name, interpolate$$1, value1) {
  var value00,
      interpolate0;
  return function() {
    var value0 = styleValue(this, name);
    return value0 === value1 ? null
        : value0 === value00 ? interpolate0
        : interpolate0 = interpolate$$1(value00 = value0, value1);
  };
}

function styleFunction(name, interpolate$$1, value) {
  var value00,
      value10,
      interpolate0;
  return function() {
    var value0 = styleValue(this, name),
        value1 = value(this);
    if (value1 == null) value1 = (this.style.removeProperty(name), styleValue(this, name));
    return value0 === value1 ? null
        : value0 === value00 && value1 === value10 ? interpolate0
        : interpolate0 = interpolate$$1(value00 = value0, value10 = value1);
  };
}

function transition_style(name, value, priority) {
  var i = (name += "") === "transform" ? interpolateTransformCss : interpolate;
  return value == null ? this
          .styleTween(name, styleRemove(name, i))
          .on("end.style." + name, styleRemoveEnd(name))
      : this.styleTween(name, typeof value === "function"
          ? styleFunction(name, i, tweenValue(this, "style." + name, value))
          : styleConstant(name, i, value + ""), priority);
}

function styleTween(name, value, priority) {
  function tween() {
    var node = this, i = value.apply(node, arguments);
    return i && function(t) {
      node.style.setProperty(name, i(t), priority);
    };
  }
  tween._value = value;
  return tween;
}

function transition_styleTween(name, value, priority) {
  var key = "style." + (name += "");
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error;
  return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
}

function textConstant(value) {
  return function() {
    this.textContent = value;
  };
}

function textFunction(value) {
  return function() {
    var value1 = value(this);
    this.textContent = value1 == null ? "" : value1;
  };
}

function transition_text(value) {
  return this.tween("text", typeof value === "function"
      ? textFunction(tweenValue(this, "text", value))
      : textConstant(value == null ? "" : value + ""));
}

function transition_transition() {
  var name = this._name,
      id0 = this._id,
      id1 = newId();

  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        var inherit = get$1(node, id0);
        schedule(node, name, id1, i, group, {
          time: inherit.time + inherit.delay + inherit.duration,
          delay: 0,
          duration: inherit.duration,
          ease: inherit.ease
        });
      }
    }
  }

  return new Transition(groups, this._parents, name, id1);
}

var id = 0;

function Transition(groups, parents, name, id) {
  this._groups = groups;
  this._parents = parents;
  this._name = name;
  this._id = id;
}

function transition(name) {
  return selection().transition(name);
}

function newId() {
  return ++id;
}

var selection_prototype = selection.prototype;

Transition.prototype = transition.prototype = {
  constructor: Transition,
  select: transition_select,
  selectAll: transition_selectAll,
  filter: transition_filter,
  merge: transition_merge,
  selection: transition_selection,
  transition: transition_transition,
  call: selection_prototype.call,
  nodes: selection_prototype.nodes,
  node: selection_prototype.node,
  size: selection_prototype.size,
  empty: selection_prototype.empty,
  each: selection_prototype.each,
  on: transition_on,
  attr: transition_attr,
  attrTween: transition_attrTween,
  style: transition_style,
  styleTween: transition_styleTween,
  text: transition_text,
  remove: transition_remove,
  tween: transition_tween,
  delay: transition_delay,
  duration: transition_duration,
  ease: transition_ease
};

function cubicInOut(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}

var pi = Math.PI;

var tau = 2 * Math.PI;

var defaultTiming = {
  time: null, // Set on use.
  delay: 0,
  duration: 250,
  ease: cubicInOut
};

function inherit(node, id) {
  var timing;
  while (!(timing = node.__transition) || !(timing = timing[id])) {
    if (!(node = node.parentNode)) {
      return defaultTiming.time = now(), defaultTiming;
    }
  }
  return timing;
}

function selection_transition(name) {
  var id,
      timing;

  if (name instanceof Transition) {
    id = name._id, name = name._name;
  } else {
    id = newId(), (timing = defaultTiming).time = now(), name = name == null ? null : name + "";
  }

  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        schedule(node, name, id, i, group, timing || inherit(node, id));
      }
    }
  }

  return new Transition(groups, this._parents, name, id);
}

selection.prototype.interrupt = selection_interrupt;
selection.prototype.transition = selection_transition;

class TooltipChart {
    constructor() {
        this.align = 'center';
    }
    tooltip(tooltip) {
        this._tooltip = select(tooltip);
        this._tooltip.style('text-align', this.align);
    }
    show(message, positions) {
        this._tooltip.transition(transition().duration(200)).style('opacity', 0.9);
        this._tooltip
            .html(message)
            .style('left', `${positions[0]}px`)
            .style('top', `${positions[1] - 38}px`);
    }
    hide() {
        this._tooltip.transition(transition().duration(500)).style('opacity', 0);
    }
    render() {
        return h("div", { class: "tooltip" });
    }
    static get is() { return "tooltip-chart"; }
    static get properties() { return {
        "align": {
            "type": String,
            "attr": "align"
        },
        "hide": {
            "method": true
        },
        "show": {
            "method": true
        },
        "tooltip": {
            "method": true
        },
        "tooltipEl": {
            "elementRef": true
        }
    }; }
    static get style() { return ".o-layout {\n  width: 100%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap; }\n  .o-layout--chart {\n    width: 100%; }\n    .is--vertical .o-layout--chart {\n      width: 90%; }\n  .o-layout--slot {\n    width: 100%; }\n    .is--vertical .o-layout--slot {\n      width: 10%;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-pack: center;\n      -ms-flex-pack: center;\n      justify-content: center;\n      -webkit-box-align: center;\n      -ms-flex-align: center;\n      align-items: center; }\n\ntooltip-chart .tooltip {\n  position: absolute;\n  padding: 0.5rem;\n  opacity: 0;\n  background-color: rgba(0, 0, 0, 0.7);\n  font: 0.75rem sans-serif;\n  color: #FFF;\n  border: 0.125rem solid #FFF;\n  -webkit-box-shadow: 0.4375rem 0.375rem 0.75rem -0.3125rem rgba(0, 0, 0, 0.2);\n  box-shadow: 0.4375rem 0.375rem 0.75rem -0.3125rem rgba(0, 0, 0, 0.2);\n  border-radius: 0.5rem 0.5rem 0.5rem 0;\n  pointer-events: none; }\n\ntooltip-chart .square {\n  display: inline-block;\n  background-color: #414ce1;\n  width: 0.625rem;\n  height: 0.625rem;\n  margin: 0 0.3125rem; }"; }
}

export { BGCMatrixChart as BcgMatrixChart, HorizontalBarChart, LegendChart, LineAnnotationsChart, App as MyApp, PieChart, TooltipChart };
