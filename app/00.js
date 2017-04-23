var svg = d3.select('body')
    .append('svg')
    .attr('viewBox', '0 0 600 800')

var width = 600
var height = 800

var data = d3.range(80).map(function (d, i) {
  return [{x: -1, y: -1}, {x: 1, y: -1}, {x: 1, y: 1}, {x: -1, y: 1}]
})

var sh = 10

function ln (fk) {
  return d3.line()
        .x(function (d, i) {
          return width / 2 + d.x * fk * sh
        })
        .y(function (d, i) {
          return height / 2 + d.y * fk * sh
        })
        .curve(d3.curveLinearClosed)
}

svg.selectAll('path')
    .data(data)
    .enter()
    .append('path')
    .attr('d', function (d, i) {
      return ln(i)(d)
    })
    .style('fill', 'none')
    .style('stroke', 'black')
    .style('stroke-width', sh - 1)
    .style('shape-rendering', 'crispEdges')
    .attr('stroke-dasharray', function () {
      return Math.random() * 1000
    })
    .attr('stroke-dashoffset', function () {
      return Math.random() * 1000
    })
