var minSize = Infinity, maxSize = Infinity;
var minColor = Infinity, maxColor = -Infinity;
var nasdaq = ["BA","ATVI","ADBE","AKAM","ALXN","GOOG","GOOGL","AMZN","AAL","AMGN","ADI","AAPL","AMAT","ADSK","ADP","AVGO",
"BIDU","BBBY","BIIB","BMRN","BRCM","CHRW","CA","CELG","CERN","CHTR","CHKP","CSCO","CTXS","CTSH","CMCSA",
"CMCSK","COST","DISCA","DISCK","DISH","DLTR","EBAY","EA","EXPD","ESRX","FB","FAST","FISV","GRMN","GILD",
"HSIC","ILMN","INCY","INTC","INTU","ISRG","JD","GMCR","KLAC","LRCX","LBTYA","LBTYK","LILA","LILAK","LVNTA",
"QVCA","LMCA","LMCK","LLTC","MAR","MAT","MU","MSFT","MDLZ","MNST","MYL","NTAP","NFLX","NVDA","NXPI","ORLY",
"PCAR","PAYX","QCOM","REGN","ROST","SNDK","SBAC","STX","SIRI","SWKS","SPLS","SBUX","SRCL","SYMC","TSLA",
"TXN","KHC","PCLN","TSCO","TRIP","FOX","FOXA","VRSK","VRTX","VIAB","VIP","VOD","WBA","WDC","WFM","WYNN",
"XLNX","YHOO"];

for(var i = 0; i < data.length; i++){
  var d = data[i];

  d.risk = d["Beta:"] == "N/A" ? 0 : d["Beta:"] ;
  d.reward = parseFloat(d["1y Target Est:"])/parseFloat(d["Prev Close:"]);
  if(isNaN(d.reward)) d.reward = 0;

  d.color = d["P/E (ttm):"] ==  "N/A" ? 0 : parseFloat(d["P/E (ttm):"]);

  d.size = getNumber(d["Market Cap:"]);
  d.business = nasdaq[i];
  var industries = ["E-Commerce", "Telecom", "Enterprise Software", "Interactive Media", "Technology"];
  d.industry = industries[Math.floor(Math.random()*5)];
}

data.sort(function(a,b){
  return a.color - b.color;
});

for (var i = 0; i < data.length; i++) {
  data[i].color = Math.floor(i/(data.length/5));
}

data.sort(function(a,b){
  return b.size - a.size;
});

for (var i = 0; i < data.length; i++) {
  var d = data[i];
  data[i].size = Math.floor(i/(data.length/5));

  console.log(d.risk,d.reward,d.color,d.size);
}

function getNumber(str){
  // Billion
  var num = 0;
  if(str.indexOf("B") > -1){
    str = str.replace("B", "");
    num = parseFloat(str) * 1000000000;
  }
  // Million
  else if(str.indexOf("M") > -1){
    str = str.replace("M", "");
    num = parseFloat(str) * 1000000;
  }

  return num;
}
