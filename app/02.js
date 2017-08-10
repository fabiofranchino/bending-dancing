;(function (d3) {
  var svg = d3.select('svg')

  var width = 1000
  var height = 300

  var data = d3.range(15).map(function (d, i) {
    return [{i: i, x: 0}, {i: i, x: 1}]
  })

  var sh = height / data.length

  var ln = d3.line()
        .x(function (d, i) {
          return width * d.x
        })
        .y(function (d, i) {
          return d.i * sh
        })
        .curve(d3.curveLinearClosed)

  var paths = svg.selectAll('path')
        .data(data)
        .enter()
        .append('path')
        .attr('d', ln)
        .style('fill', 'none')
        .style('stroke', 'black')
        .style('stroke-width', sh - 1)
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
            .duration(1500)
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
