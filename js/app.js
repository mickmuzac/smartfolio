var stocks = data;

// for(l=0; l<110; l++)
// {
//   var boold = true;
//   if(l%2)
//   {
//     boold = false;
//   }
//   stocks.push({
//     business:"Business " + l,
//     industry:"Industry " + l%5,
//     risk:Math.floor(Math.random()*100),
//     reward:Math.floor(Math.random()*100),
//     up:boold,
//     color:Math.floor(Math.random()*4),
//     size:Math.floor(Math.random()*4)});
// }

createChart(stocks);


//stocks[] object containing business, industry, risk, reward
function createChart(stocks)
{
  var businessChart = nv.models.scatterChart()
                .showDistX(false)    //showDist, when true, will display those little distribution lines on the axis.
                .showDistY(false)
                // .transitionDuration(350)
                .color(["#99FF99","#66FF66","#33CC33","#009933","#003300","#FF1A1A","#FF0000","#E60000","#CC0000","#B30000"])
                .showLegend(false);

  var industryChart = nv.models.scatterChart()
                .showDistX(false)    //showDist, when true, will display those little distribution lines on the axis.
                .showDistY(false)
                // .transitionDuration(350)
                .color(d3.scale.category10().range())
                .showLegend(true);

  businessChart.tooltip.contentGenerator(function (d) {
          console.log(d);
          var html = "<h2>"+ d.point.business +"</h2>";

          html += "<h3 style='color:"+d.point.color+"'>"
                  +d.point.industry+"</h3>";

          return html;
        })

  industryChart.tooltip.contentGenerator(function (d) {
          var html = "<h2>"+ d.point.business +"</h2>";
          var i = 0;

          html += "<h3 style='color:"+d.point.color+"'>"
                  +d.point.industry+"</h3>";
          return html;
        })

  businessChart.xAxis.tickFormat(d3.format('.02f'));
  businessChart.xAxis.axisLabel("Risk");
  businessChart.yAxis.tickFormat(d3.format('.02f'));
  businessChart.yAxis.axisLabel("Expected Return");

  industryChart.xAxis.tickFormat(d3.format('.02f'));
  industryChart.xAxis.axisLabel("Risk");
  industryChart.yAxis.tickFormat(d3.format('.02f'));
  industryChart.yAxis.axisLabel("Expected Return");

  var myData = businessData(stocks);
  d3.select('#business svg')
      .datum(myData)
      .call(businessChart);
  nv.addGraph(businessChart);

  var secondData = industryData(stocks);
  d3.select('#industry svg')
      .datum(secondData)
      .call(industryChart);
  nv.addGraph(industryChart);

  nv.utils.windowResize(businessChart.update);
  nv.utils.windowResize(industryChart.update);

  //Draw the line
 var circle = d3.select("svg").append("line")
                        .attr("x1", 240)
                         .attr("y1", 500)
                         .attr("x2", 850)
                         .attr("y2", 50)
                         .attr("stroke-width", 1)
                         .attr("stroke", "darkgray");

}

/**************************************
 * Simple test data generator
 */
function businessData(stocks)
{ //# groups,# stocks.length per group
  var data = [];

    for(j = 0; j < stocks.length; j++)
    {

      data.push({
        key: stocks[j].business,
        values: []
      });
    }
    for (i = stocks.length-1; i >= 0; i--)
    {
      var p1 = {};
      p1.x = -.2;
      p1.y = .7;
      var p2 = {};
      p2.x = 2.3;
      p2.y = 1.6;
      var p3 = {};
      p3.x = -.2;
      p3.y = 1.6;

      var p = {};
      p.x = stocks[i].risk;
      p.y = stocks[i].reward;

      var alpha = ((p2.y - p3.y)*(p.x - p3.x) + (p3.x - p2.x)*(p.y - p3.y)) /
          ((p2.y - p3.y)*(p1.x - p3.x) + (p3.x - p2.x)*(p1.y - p3.y));
      var beta = ((p3.y - p1.y)*(p.x - p3.x) + (p1.x - p3.x)*(p.y - p3.y)) /
             ((p2.y - p3.y)*(p1.x - p3.x) + (p3.x - p2.x)*(p1.y - p3.y));
      var gamma = 1.0 - alpha - beta;

      var curShape;
      if(alpha >0 && beta >0 && gamma >0)
      {
        curShape = 'diamond';
      }
      else
      {
        curShape = 'circle';
      }


      // if(stocks[i].up)
      // {
      //   curShape = 'circle';
      // }
      // else
      // {
      //   curShape = 'circle';
      // }
      var colorVal = stocks[i].color;
      // if(!stocks[i].up)
      // {
      //   colorVal += 5;
      // }
      if(stocks[i].business == "EA" ||
      stocks[i].business == "LBTYK" ||
      stocks[i].business == "CHTR" ||
      stocks[i].business == "AAL" ){
        continue;
      }
      data[colorVal].values.push({
        x: parseFloat(stocks[i].risk)
      , y: stocks[i].reward
      , size: stocks[i].size*10   //Configure the size of each scatter point
      , shape: curShape  //Configure the shape of each scatter point.
      , business: stocks[i].business
      , industry: stocks[i].industry
      });
    }

  return data;
}

function industryData(stocks)
{ //# groups,# stocks.length per group
  var data = [];

  var map = {};
  var industries = [];

  var k = 0;
  for (i = 0; i< stocks.length; i++)
  {
    if(industries.indexOf(stocks[i].industry) == -1)
    {
      map[stocks[i].industry] = k;
      industries.push(stocks[i].industry);
      k++;
    }
  }

  for (i = 0; i < industries.length; i++)
  {
    data.push({
      key: industries[i],
      values: []
    });
  }

  for (j = stocks.length-1; j >= 0; j--)
  {
    if(stocks[j].business == "EA" ||
    stocks[j].business == "LBTYK" ||
    stocks[j].business == "CHTR" ||
    stocks[j].business == "AAL" ){
      // console.log(stocks[i].business);
      // stocks.splice(i);
      continue;
    }

    if(stocks[j].up)
    {
      var curShape = 'circle';
    }
    else
    {
      var curShape = 'circle';
    }
    data[map[stocks[j].industry]].values.push({
      x: stocks[j].risk
    , y: stocks[j].reward
    , size:stocks[j].size*10   //Configure the size of each scatter point
    , shape: curShape  //Configure the shape of each scatter point.
    , business: stocks[j].business
    , industry: stocks[j].industry
    });
  }

  return data;
}
