;(function (d3) {
  var svg = d3.select('svg')

  var width = 1000
  var height = 300

  var data = d3.range(30).map(function (d, i) {
    return [{i: i, x: -1, y: -1}, {i: i, x: 1, y: -1}, {i: i, x: 1, y: 1}, {i: i, x: -1, y: 1}]
  })

  var sh = 20

  var ln = d3.line()
        .x(function (d, i) {
          return width / 2 + d.x * d.i * sh
        })
        .y(function (d, i) {
          return height / 2 + d.y * d.i * sh
        })
        .curve(d3.curveLinearClosed)

  var paths = svg.selectAll('path')
        .data(data)
        .enter()
        .append('path')
        .attr('d', ln)
        .style('fill', 'none')
        .style('stroke', 'black')
        .style('stroke-width', sh - 2)
        .style('shape-rendering', 'crispEdges')
        .attr('stroke-dasharray', function () {
          var myPath = this
          var length = myPath.getTotalLength()
          return length
        })
        .attr('stroke-dashoffset', function () {
          return 0
        })

  svg.on('click', function () {
    paths.transition()
            .duration(2000)
            .ease(d3.easeExpInOut)
            .attr('stroke-dasharray', function () {
              var myPath = this
              var length = myPath.getTotalLength()
              return Math.random() * length
            })
            .attr('stroke-dashoffset', function () {
              var myPath = this
              var length = myPath.getTotalLength()
              return Math.random() * length
            })
  })
})(window.d3)
