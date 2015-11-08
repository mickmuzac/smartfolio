var stocks = [];

for(i=0; i<20; i++)
{
  var boold = true;
  if(i%2)
  {
    boold = false;
  }
  stocks.push({
    business:"Business " + i,
    industry:"Industry " + i,
    risk:i,
    reward:i,
    up:boold,
    color:0});
}

createChart(stocks);


//stocks[] object containing business, industry, risk, reward
function createChart(stocks)
{
  var businessChart = nv.models.scatterChart()
                .showDistX(false)    //showDist, when true, will display those little distribution lines on the axis.
                .showDistY(false)
                // .transitionDuration(350)
                .color(d3.scale.category10().range())
                .showLegend(false);

  var industryChart = nv.models.scatterChart()
                .showDistX(false)    //showDist, when true, will display those little distribution lines on the axis.
                .showDistY(false)
                // .transitionDuration(350)
                .color(d3.scale.category10().range())
                .showLegend(true);

  businessChart.tooltip.contentGenerator(function (d) {
          console.log(d);
          var html = "<h2>"+ d.value +"</h2> <ul>";

          d.series.forEach(function(elem){
            html += "<li><h3 style='color:"+elem.color+"'>"
                    +elem.key+"</h3> : <b>"+elem.value+"</b></li>";
          })
          html += "</ul>"
          return html;
        })

  industryChart.tooltip.contentGenerator(function (d) {
          var html = "<h2>"+ d.value +"</h2> <ul>";

          d.series.forEach(function(elem){
            html += "<li><h3 style='color:"+elem.color+"'>"
                    +elem.key+"</h3> : <b>"+elem.value+"</b></li>";
          })
          html += "</ul>"
          return html;
        })

  businessChart.xAxis.tickFormat(d3.format('.02f'));
  businessChart.xAxis.axisLabel("Risk");
  businessChart.yAxis.tickFormat(d3.format('.02f'));
  businessChart.yAxis.axisLabel("Reward");

  industryChart.xAxis.tickFormat(d3.format('.02f'));
  industryChart.xAxis.axisLabel("Risk");
  industryChart.yAxis.tickFormat(d3.format('.02f'));
  industryChart.yAxis.axisLabel("Reward");
    // .axisLabelDistance(40);

  //We want to show shapes other than circles.
  // chart.scatter.onlyCircles(false);

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

}

/**************************************
 * Simple test data generator
 */
function businessData(stocks)
{ //# groups,# stocks.length per group
  var data = [],
      shapes = ['circle', 'cross', 'triangle-up', 'triangle-down', 'diamond', 'square'],
      random = d3.random.normal();

    for(j = 0; j < 5; j++)
    {
      data.push({
        key: stocks[j].business,
        values: []
      });
    }
    for (i = 0; i < stocks.length; i++)
    {
      var curShape;
      if(stocks[i].up)
      {
        curShape = 'triangle-up';
      }
      else
      {
        curShape = 'triangle-down';
      }
      data[stocks[i].color].values.push({
        x: stocks[i].risk
      , y: stocks[i].reward
      , size: Math.random()   //Configure the size of each scatter point
      , shape: curShape  //Configure the shape of each scatter point.
      });
    }

  return data;
}

function industryData(stocks)
{ //# groups,# stocks.length per group
  var data = [],
      shapes = ['circle', 'cross', 'triangle-up', 'triangle-down', 'diamond', 'square'],
      random = d3.random.normal();

  var groups = 4;
  for (i = 0; i < groups; i++) {
    data.push({
      key: stocks[i].industry,
      values: []
    });

    for (j = 0; j < stocks.length; j++) {
      var curShape;
      if(stocks[j].up)
      {
        curShape = 'triangle-up';
      }
      else
      {
        curShape = 'triangle-down';
      }
      data[i].values.push({
        x: stocks[j].risk
      , y: stocks[j].reward
      , size: Math.random()   //Configure the size of each scatter point
      , shape: curShape  //Configure the shape of each scatter point.
      });
    }
  }

  return data;
}
