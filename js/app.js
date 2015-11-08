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
          var html = "<h2>"+ d.point.business +"</h2> <ul>";

          d.series.forEach(function(elem){
            html += "<li><h3 style='color:"+elem.color+"'>"
                    +d.point.industry+"</h3></li>";
          })
          html += "</ul>"
          return html;
        })

  industryChart.tooltip.contentGenerator(function (d) {
          var html = "<h2>"+ d.point.business +"</h2> <ul>";
          var i = 0;
          d.series.forEach(function(elem){
            html += "<li><h3 style='color:"+elem.color+"'>"
                    +d.point.industry+"</h3></li>";
          })
          html += "</ul>"
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
      if(stocks[i].business == "EA" ||
      stocks[i].business == "LBTYK" ||
      stocks[i].business == "CHTR"){
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
    if(!map[stocks[i].industry])
    {
      map[stocks[i].industry] = k;
      industries.push(stocks[i].industry);
      k++;
    }
  }

  for (i = 0; i < Object.keys(map).length+1; i++)
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
    stocks[j].business == "CHTR"){
      // console.log(stocks[i].business);
      // stocks.splice(i);
      continue;
    }
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
    , business: stocks[j].business
    , industry: stocks[j].industry
    });
  }

  return data;
}
