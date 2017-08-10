;(function (d3) {
  var svg = d3.select('svg')

  var width = 1000
  var height = 300

  var data = d3.range(15)

  var sh = 40

  var paths = svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', width / 2)
        .attr('cy', height / 2)
        .attr('r', function (d, i) {
          return 40 + (i * sh) - 1
        })
        .style('fill', 'none')
        .style('stroke', '#000')
        .style('stroke-width', sh - 2)
        // .style('shape-rendering', 'crispEdges')
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
