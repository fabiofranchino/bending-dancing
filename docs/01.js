!function(a){var b=document.getElementById("a"),c=b.getTotalLength(),d=a("svg #a"),e=a("[array]"),f=a("[offset]");a("#first").rangeslider({polyfill:!1,onInit:function(){},onSlide:function(a,b){d.css("stroke-dasharray",b),e.text(b)},onSlideEnd:function(a,b){}}),a("#second").rangeslider({polyfill:!1,onInit:function(){},onSlide:function(a,b){d.css("stroke-dashoffset",b),f.text(b)},onSlideEnd:function(a,b){}}),a("button").on("click",function(){d.css("stroke-dasharray",c),d.css("stroke-dashoffset",c),d3.select("svg #a").transition().duration(5e3).style("stroke-dashoffset",0)})}(window.jQuery);