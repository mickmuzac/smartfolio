var stocks = [];

for(i=0; i<110; i++)
{
  var boold = true;
  if(i%2)
  {
    boold = false;
  }
  stocks.push({
    business:"Business " + i,
    industry:"Industry " + i%5,
    risk:Math.floor(Math.random()*100),
    reward:Math.floor(Math.random()*100),
    up:boold,
    color:Math.floor(Math.random()*4),
    size:Math.floor(Math.random()*4)});
}

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
  var data = [];

    for(j = 0; j < 10; j++)
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
      var colorVal = stocks[i].color;
      if(!stocks[i].up)
      {
        colorVal += 5;
      }
      data[colorVal].values.push({
        x: stocks[i].risk
      , y: stocks[i].reward
      , size: stocks[i].size*10   //Configure the size of each scatter point
      , shape: curShape  //Configure the shape of each scatter point.
      });
    }

  return data;
}

function industryData(stocks)
{ //# groups,# stocks.length per group
  var data = [];

  var groups = 4;
  var map = {};
  var industries = [];

  var k = 0;
  for (i = 0; i< stocks.length; i++)
  {
    if(!map[stocks[i].industry])
    {
      map[stocks[i].industry] = k;
      industries.push(stocks[i].industry);
      k++;
    }
  }
  // k--;
  for (i = 0; i < k; i++) {
    data.push({
      key: industries[i],
      values: []
    });
  }

    for (j = 0; j < stocks.length; j++) {
      // var curShape;
      if(stocks[j].up)
      {
        var curShape = 'triangle-up';
      }
      else
      {
        var curShape = 'triangle-down';
      }
      data[map[stocks[j].industry]].values.push({
        x: stocks[j].risk
      , y: stocks[j].reward
      , size:stocks[j].size*10   //Configure the size of each scatter point
      , shape: curShape  //Configure the shape of each scatter point.
      });
    }

  return data;
}
