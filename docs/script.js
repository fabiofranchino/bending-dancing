;(function (d3) {
  var svg = d3.select('svg')

  var rect = svg.append('rect')

  var txt = svg.append('text')
    .style('text-anchor', 'middle')
    .style('font-size', '10')
    .text('CLICK TO CHANGE')

  var togg = false
  var timer

  function run () {
    var width = document.body.clientWidth
    var height = document.body.clientHeight

    svg.attr('viewBox', `0 0 ${width} ${height}`)

    txt.attr('x', width / 2)
      .attr('y', height / 2 + 10)

    rect.attr('width', width)
      .attr('height', height)
      .transition()
      .duration(3000)
      .style('fill', () => (togg) ? 'black' : 'white')

    var dataPoint = d3.range(6).map(function (d, i) {
      return {x: i, y: Math.random()}
    })

    var data = d3.range(20).map(function (d, i) {
      var arr = []
      dataPoint.forEach(function (d) {
        var nd = JSON.parse(JSON.stringify(d)) // clone
        nd.i = i
        arr.push(nd)
      })
      return arr
    })

    var exceed = 10 + Math.random() * width

    var mapX = d3.scaleLinear()
      .domain([0, 5])
      .range([-10, width + exceed])

    var mapY = d3.scaleLinear()
      .domain([0, 1])
      .range([0, height])

    var ln = d3.line()
        .x(function (d, i) {
          return mapX(d.x)
        })
        .y(function (d, i) {
          return mapY(d.y) + d.i * 20
        })
        .curve(d3.curveBasis)

    var paths = svg.selectAll('path')
        .data(data)

    var newPaths = paths.enter()
        .append('path')
        .attr('d', ln)
        .style('fill', 'none')
        .style('stroke-width', d => Math.random() * 30)

    var t = 3000

    paths.merge(newPaths)
        .transition()
        .duration(3000)
        .delay((d, i) => i * 30)
        .ease(d3.easeExpInOut)
        .attr('stroke-dasharray', function () {
          var myPath = this
          var length = myPath.getTotalLength()
          var v = (togg) ? Math.random() * length : length
          return v
        })
        .attr('stroke-dashoffset', function () {
          var myPath = this
          var length = myPath.getTotalLength()
          var v = (togg) ? Math.random() * length : 0
          return v
        })
        .attr('d', ln)
        .style('stroke', () => (togg) ? 'white' : 'black')
        .style('stroke-width', d => Math.random() * 30)

    timer = setTimeout(run, t + 1000)
  }
  run()

  svg.on('click', function () {
    togg = !togg
    clearTimeout(timer)
    txt.remove()
    run()
  })
})(window.d3)
