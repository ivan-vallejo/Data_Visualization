
function zoom(d, ratio) {
// function that updates the view and displays the zoom area
  var x = d3.scaleLinear()
      .domain([d.x0, d.x1])
      .range([0, width]);
  var y = d3.scaleLinear()
      .domain([d.y0, d.y1])
      .range([0, height]);

  var t = svg.selectAll("g.cell");
    t
      .transition()
      .duration(duration_transitions)
      .attr("transform", function(d) { xn= x(d.x0)*ratio+margin.left; yn= y(d.y0)*ratio+margin.top;return "translate(" + xn + "," + yn + ")"; });

  t.select("rect")
          .transition()
          .duration(duration_transitions)
          .call(cursor)
          .attr("width", function(d) {return (x(d.x1) - x(d.x0))*ratio; })
          .attr("height", function(d) { return (y(d.y1) - y(d.y0))*ratio; })
          .attr("stroke","white")
          .attr("stroke-width",stroke)
          .style("opacity", function(d) {return (x(d.x0) < 0 || x(d.x1) > width+0.1 || y(d.y0) < 0 || y(d.y1) > height+0.1 ) ? 0 : 1; });

if(dzoom){
  t.select(".node-label")
      .style("opacity", function(d) {return (x(d.x0) < 0 || x(d.x1) > width +0.1 || y(d.y0) < 0 || y(d.y1) > height +0.1 ) ? 0 : 1; })
      .transition()
      .call(cursor)
      .delay(duration_transitions/2)
      .call(fit_text,ratio,x,y);


  t.select(".node-value")
          .style("opacity", function(d) {return (x(d.x0) < 0 || x(d.x1) > width +0.1 || y(d.y0) < 0 || y(d.y1) > height +0.1 ) ? 0 : 1; })
          .transition()
          .call(cursor)
          .delay(duration_transitions/2)
          .call(fit_value,ratio,x,y);
} else{

  t.select(".node-label")
      .transition()
      .call(cursor)
      .delay(duration_transitions/2)
      .call(fit_text,ratio)
      .duration(duration_transitions/2)
      .style("opacity",1);


  t.select(".node-value")
      .transition()
      .call(cursor)
      .delay(duration_transitions/2)
      .call(fit_value,ratio)
      .duration(duration_transitions/2)
      .style("opacity",1);
}
  node = d;
  d3.event.stopPropagation();
}

function add_stats(perusers, data2010, data2015,bool2015){

	// function that adds stats to tooltip (% non users and diff across years)
	users = parseFloat(perusers)

  if(bool2015){
    nums2010 = parseFloat(data2010)
    decrease = (data2015-nums2010 < 0) ? true : false
    if(decrease){
      value = d3.format(",.2r")((nums2010-data2015)/1000000)
      return ("<small>"+ "(" + users + "% population)" + "</small>" + "<br>" + "<b>" + "<font color='darkred'>" + value + "M" + "</font>" + "</b>" + " less than in 2010")

    }else{
      value = d3.format(",.2r")((data2015-nums2010)/1000000)
      return ("<small>"+ "(" + users + "% population)" + "</small>" + "<br>" + "<b>" + "<font color='green'>" + value + "M" + "</font>" + "</b>" + " more than in 2010")
    }

  } else {
    return ("<small>"+ "(" + users + "% population)" + "</small>")
  }


}


function update_legend(selection, pos,text){
	// function that updates the legend
  var selector = "rect[id='"+text+"']"
  var selector2 = "text[id='"+text+"s"+"']"

      selection
          .select(selector)
            .attr("y",function(d){return margin.top + 60*pos});
      selection
          .select(selector2)
          .attr("y",function(d){return margin.top + 60*pos});
}

function cursor(selection){
	// function that changes the cursor to zoom-in or zoom-out lens depending on whether we are in general view or in zoom view
  if(dzoom){
    selection.attr("cursor","zoom-out")
  }else{
    selection.attr("cursor","zoom-in")
  }

}

function draw_legend(selection, pos,text, margin){
// function to draw the legend (1st time, then use update function)
			selection
          .append('rect')
            .attr('id',text)
            .attr("width", "20")
            .attr("height", "20")
            .attr("x", margin.left)
            .attr("y",function(d){return margin.top + 60*pos})
            .attr("fill", color(text));
      selection
          .append("text")
          .attr('id',text+"s")
          .attr("x", margin.left)
          .attr("y",function(d){return margin.top + 60*pos})
          .attr("dy", y_padding + "px")
          .attr("dx", 15*x_padding + "px")
          .text(text);

}


function fit_text(selection,scale,x,y){
// function to fit/write the country name to the rectangle space
  if(x ==null || y == null){
    var xt = function(x){return x};
    var yt = function(x){return x};
  }else{
    var xt = x;
    var yt = y;
  }

  selection
    .text( function(d){

      var iso = String(d.parent.parent.parent.data.key).toUpperCase()
      var fullname = String(d.parent.parent.data.key)


      if((getTextWidth(fullname,15,"arial") < (((xt(d.x1) - xt(d.x0))-x_padding)*scale)) && (getTextWidth("l",15,"arial") < (((yt(d.y1) - yt(d.y0))-1.2*y_padding)*scale))) {

        return(fullname)

      }else if((getTextWidth(iso,15,"arial") < (((xt(d.x1) - xt(d.x0))-x_padding)*scale)) && (getTextWidth("l",15,"arial") < (((yt(d.y1) - yt(d.y0))-1.2*y_padding)*scale))){


        return(iso)

      }else if((getTextWidth(iso,9,"arial") < (((xt(d.x1) - xt(d.x0))-x_padding)*scale)) && (getTextWidth("l",9,"arial") < (((yt(d.y1) - yt(d.y0))-1.2*y_padding*3/4)*scale))){

        return(iso)

      }
    })

    .attr("font-size",function(d){

      var iso = String(d.parent.parent.parent.data.key).toUpperCase()

        if((getTextWidth(iso,15,"arial") < (((xt(d.x1) - xt(d.x0))-x_padding)*scale)) && (getTextWidth("l",15,"arial") < (((yt(d.y1) - yt(d.y0))-1.2*y_padding)*scale))){

          return("15px")
        }  else{
          return("9px")
        }

      })

      .attr("dy", function(d){

        var iso = String(d.parent.parent.parent.data.key).toUpperCase()

          if((getTextWidth(iso,15,"arial") < (((xt(d.x1) - xt(d.x0))-x_padding)*scale)) && (getTextWidth("l",15,"arial") < (((yt(d.y1) - yt(d.y0))-1.2*y_padding)*scale))){

            return(y_padding + "px")
          }  else{
            return(y_padding*3/4 + "px")
          }
        });


}

function fit_value(selection,scale,x,y){
// function to fit/write the country value to the rectangle space
  if(x ==null || y == null){
    var xt = function(x){return x};
    var yt = function(x){return x};
  }else{
    var xt = x;
    var yt = y;
  }

  selection
    .text( function(d){

      var text = String(format(d.value/1000000))+"M"

      if((getTextWidth(text,15,"sans-serif") < (((xt(d.x1) - xt(d.x0))-x_padding)*scale)) && (getTextWidth("a",15,"sans-serif") < (((yt(d.y1) - yt(d.y0))-2*y_padding)*scale))) {

        return(text)

      }
    })

}

function getTextWidth(text, fontSize, fontFace) {
// generic function to calculate the width of a given text
    var a = document.createElement('canvas');
    var b = a.getContext('2d');
    b.font = fontSize + 'px ' + fontFace;
    return b.measureText(text).width;
}

function getTextHeight(text, fontSize, fontFace) {
// generic function to calculate the height of a given text
    var a = document.createElement('canvas');
    var b = a.getContext('2d');
    b.font = fontSize + 'px ' + fontFace;
    return b.measureText(text).height;
}
