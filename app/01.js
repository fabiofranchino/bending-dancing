;(function ($) {
  var myPath = document.getElementById('a')
  var length = myPath.getTotalLength()

  var a = $('svg #a')
  var arr = $('[array]')
  var off = $('[offset]')
    // first slider
  $('#first').rangeslider({

    polyfill: false,

    onInit: function () {
      console.log('init first')
    },

    onSlide: function (position, value) {
      a.css('stroke-dasharray', value)
      arr.text(value)
    },

    onSlideEnd: function (position, value) {
      console.log('first', value)
    }

  })

  // second slider
  $('#second').rangeslider({

    polyfill: false,

    onInit: function () {
      console.log('init second')
    },

    onSlide: function (position, value) {
      a.css('stroke-dashoffset', value)
      off.text(value)
    },

    onSlideEnd: function (position, value) {
      console.log('second', value)
    }

  })

  $('button').on('click', function () {
    a.css('stroke-dasharray', length)
    a.css('stroke-dashoffset', length)
    d3.select('svg #a')
      .transition()
      .duration(5000)
      .style('stroke-dashoffset', 0)
  })
})(window.jQuery)
