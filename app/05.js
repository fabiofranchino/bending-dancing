;(function (d3) {
  var svg = d3.select('svg')

  var width = 1000
  var height = 300

  var pv = 10
  var data = d3.range(18).map(function (d, i) {
    var v = Math.random() * 100 + 5
    var ob = {i: i, v: v, pv: pv}
    pv += v
    return ob
  })

  var colors = d3.scaleLinear()
    .domain([0, data.length])
    .interpolate(d3.interpolateHcl)
    .range([d3.rgb('orange'), d3.rgb('purple')])

  var paths = svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', width / 2)
        .attr('cy', height / 2)
        .attr('r', function (d, i) {
          return d.pv + d.v / 2
        })
        .style('fill', 'none')
        .style('transform-origin', 'center')
        .style('stroke', function (d, i) {
          return colors(i)
        })
        .attr('stroke-width', function (d, i) {
          return d.v
        })
        // .style('shape-rendering', 'crispEdges')
        .attr('stroke-dasharray', function () {
          var myPath = this
          var length = myPath.getTotalLength()
          return length
        })
        .attr('stroke-dashoffset', function () {
          var myPath = this
          var length = myPath.getTotalLength()
          return Math.random() * length
        })

  var anim
  var ang = 0
  function loop () {
    paths.style('transform', 'rotate(' + ang + 'deg)')
    anim = requestAnimationFrame(loop)
    ang++
  }
  requestAnimationFrame(loop)

  svg.on('click', function () {
    // cancelAnimationFrame(anim)

    var pv = 10
    var data = d3.range(18).map(function (d, i) {
      var v = Math.random() * 100 + 5
      var ob = {i: i, v: v, pv: pv}
      pv += v
      return ob
    })

    svg.selectAll('circle')
        .data(data)
        .transition()
        .duration(2000)
        .ease(d3.easeExpInOut)
        .attr('r', function (d, i) {
          return d.pv + d.v / 2
        })
        .attr('stroke-width', function (d, i) {
          return d.v
        })
        .attr('stroke-dasharray', function () {
          var myPath = this
          var length = myPath.getTotalLength()
          return length
        })

    // setTimeout(loop, 1000)
  })
})(window.d3)
