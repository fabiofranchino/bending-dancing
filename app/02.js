;(function (d3) {
  var svg = d3.select('svg')

  var width = 1000
  var height = 300

  var data = d3.range(10)

  var sh = height / data.length

  var paths = svg.selectAll('path')
        .data(data)
        .enter()
        .append('line')
        .attr('x1', 0)
        .attr('y1', function (d, i) {
          return sh / 2 + i * sh
        })
        .attr('x2', width)
        .attr('y2', function (d, i) {
          return sh / 2 + i * sh
        })
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
