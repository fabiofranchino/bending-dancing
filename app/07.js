;(function (d3) {
  var svg = d3.select('svg')

  var width = 1000
  var height = 300

  var dataPoint = d3.range(6).map(function (d, i) {
    return {x: i, y: Math.random()}
  })

  var data = d3.range(20).map(function (d, i) {
    var arr = []
    dataPoint.forEach(function (d) {
      var nd = JSON.parse(JSON.stringify(d))
      nd.i = i
      arr.push(nd)
    })
    return arr
  })

  console.log(data)

  var mapX = d3.scaleLinear()
    .domain([0, 5])
    .range([0, width])

  var mapY = d3.scaleLinear()
    .domain([0.5, 1])
    .range([0, height])

  var ln = d3.line()
        .x(function (d, i) {
          return mapX(d.x)
        })
        .y(function (d, i) {
          return mapY(d.y) + d.i * 20
        })
        .curve(d3.curveMonotoneX)

  var paths = svg.selectAll('path')
        .data(data)
        .enter()
        .append('path')
        .attr('d', ln)
        .style('fill', 'none')
        .style('stroke', 'black')
        .style('stroke-width', 18)
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
