;(function (d3) {
  var svg = d3.select('svg')

  var width = 1000
  var height = 300

  var sh = 40

  var data = d3.range(15).map(function (d, i) {
    return {x: width / 2, y: height / 2, r: 40 + (i * sh) - 1}
  })

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
        .attr('d', d => {
          return 'M' + d.x + ',' + d.y + ' ' +
           'm' + -d.r + ', 0 ' +
           'a' + d.r + ',' + d.r + ' 0 1,0 ' + d.r * 2 + ',0 ' +
           'a' + d.r + ',' + d.r + ' 0 1,0 ' + -d.r * 2 + ',0Z'
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
