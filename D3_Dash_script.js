setTimeout(() => 
{
    // window.addEventListener("DOMContentLoaded", function () {
        // document.addEventListener('DOMContentLoaded', function() {
        
            // console.log('load');
        
            const svg = d3
              .select("#content")
              .append("svg")
              .attr("width", "500")
              .attr("height", "350");
          
            const margin = { top: 20, right: 20, bottom: 30, left: 50 };
            const width = +svg.attr("width") - margin.left - margin.right;
            const height = +svg.attr("height") - margin.top - margin.bottom;
          
            function make_x_axis() {
              return (
                d3
                  .axisBottom(x)
                  // .scale(x)
                  //  .orient("bottom")
                  .ticks(5)
              );
            }
          
            function make_y_axis() {
              return (
                d3
                  .axisLeft(y)
                  // .scale(y)
                  // .orient("left")
                  .ticks(5)
              );
            }
          
            let points = d3.range(1, 10).map(function (i) {
              return [(i * width) / 10, 50 + Math.random() * (height - 100)];
            });
          
            var x = d3.scaleLinear().rangeRound([0, width]);
          
            var y = d3.scaleLinear().rangeRound([height, 0]);
          
            var xAxis = d3.axisBottom(x),
              yAxis = d3.axisLeft(y);
          
            var line = d3
              .line()
              .x(function (d) {
                return x(d[0]);
              })
              .y(function (d) {
                return y(d[1]);
              });
          
            let drag = d3
              .drag()
              .on("start", dragstarted)
              .on("drag", dragged)
              .on("end", dragended);
          
            svg
              .append("rect")
              .attr("class", "zoom")
              .attr("cursor", "move")
              .attr("fill", "none")
              .attr("pointer-events", "all")
              .attr("width", width)
              .attr("height", height)
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
          
            svg
              .append("g")
              .attr("class", "grid")
              .attr("transform", `translate(${margin.left}, ${height + margin.top})`)
              .call(make_x_axis().tickSize(-height).tickFormat(""));
          
            // add the Y gridlines
            svg
              .append("g")
              .attr("class", "grid")
              .attr("transform", `translate(${margin.left}, ${margin.top})`)
              .call(make_y_axis().tickSize(-width).tickFormat(""));
          
            var focus = svg
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
          
            x.domain(
              d3.extent(points, function (d) {
                return d[0];
              })
            );
            y.domain(
              d3.extent(points, function (d) {
                return d[1];
              })
            );
          
            focus
              .append("path")
              .datum(points)
              .attr("fill", "none")
              .attr("stroke", "white")
              .attr("stroke-linejoin", "round")
              .attr("stroke-linecap", "round")
              .attr("stroke-width", 1.5)
              .attr("d", line);
          
            focus
              .selectAll("circle")
              .data(points)
              .enter()
              .append("circle")
              .attr("r", 5.0)
              .attr("cx", function (d) {
                return x(d[0]);
              })
              .attr("cy", function (d) {
                return y(d[1]);
              })
              .style("cursor", "pointer")
              .style("fill", "steelblue");
          
            focus.selectAll("circle").call(drag);
          
            focus
              .append("g")
              .attr("class", "axis axis--x")
              .attr("transform", "translate(0," + height + ")")
              .call(xAxis);
          
            focus.append("g").attr("class", "axis axis--y").call(yAxis);
          
            function dragstarted(d) {
              d3.select(this).raise().classed("active", true);
            }
          
            function dragged(d) {
              //d[0] = x.invert(d3.event.x);
              d[1] = y.invert(d3.event.y);
              d3.select(this)
                //.attr('cx', x(d[0]))
                .attr("cy", y(d[1]));
              focus.select("path").attr("d", line);
            }
          
            function dragended(d) {
              d3.select(this).classed("active", false);
            }
            
            // document.querySelector("#content").style.display = "none" // Hide if button content if button has not yet been clicked.
        //   });

//         d3.select('#chart1 svg').remove();
 
//         document.querySelector('#chart1').appendChild(
//            Plot.plot({
//              x: {
//                domain: [-4, 4]
//              },
//              marks: [
//                Plot.tickX({length: 500}, {x: JSON.parse(data), strokeOpacity: 0.2, title: d3.randomNormal()}),
//              ]
//            })
//         )
}, 
1500);




