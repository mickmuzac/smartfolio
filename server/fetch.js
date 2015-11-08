var nasdaq = ["BA","ATVI","ADBE","AKAM","ALXN","GOOG","GOOGL","AMZN","AAL","AMGN","ADI","AAPL","AMAT","ADSK","ADP","AVGO",
"BIDU","BBBY","BIIB","BMRN","BRCM","CHRW","CA","CELG","CERN","CHTR","CHKP","CSCO","CTXS","CTSH","CMCSA",
"CMCSK","COST","DISCA","DISCK","DISH","DLTR","EBAY","EA","EXPD","ESRX","FB","FAST","FISV","GRMN","GILD",
"HSIC","ILMN","INCY","INTC","INTU","ISRG","JD","GMCR","KLAC","LRCX","LBTYA","LBTYK","LILA","LILAK","LVNTA",
"QVCA","LMCA","LMCK","LLTC","MAR","MAT","MU","MSFT","MDLZ","MNST","MYL","NTAP","NFLX","NVDA","NXPI","ORLY",
"PCAR","PAYX","QCOM","REGN","ROST","SNDK","SBAC","STX","SIRI","SWKS","SPLS","SBUX","SRCL","SYMC","TSLA",
"TXN","KHC","PCLN","TSCO","TRIP","FOX","FOXA","VRSK","VRTX","VIAB","VIP","VOD","WBA","WDC","WFM","WYNN",
"XLNX","YHOO"];

var request = require('request');
var fs = require('fs');
var cheerio = require('cheerio');

var url = 'http://finance.yahoo.com/q?s={{stock}}&fr=uh3_finance_web&uhb=uhb2';
var i = 0;
var saveArr = [];

function makeNextRequest(){
  console.log("Fetching: " + nasdaq[i]);
  request(url.replace('{{stock}}', nasdaq[i]), function (error, response, body) {
    console.log("Writing: " + nasdaq[i]);
    i++;
    parseHTML(body);
  });
}

function parseHTML(html){
  var $ = cheerio.load(html);
  var outObj = {};

  $('#table1 tr, #table2 tr').each(function(index){
      outObj[$('th', this).text().trim()] = $('td', this).text().trim();
  });

  var isPos = $("#yfi_rt_quote_summary .pos_arrow")[0];
  outObj.up = !!isPos;

  saveArr.push(outObj);
  if(i < nasdaq.length) setTimeout(makeNextRequest, 1000);
  else writeOut(JSON.stringify(saveArr));
}

function writeOut(str){
  fs.writeFile('./sites/done', str, function(){
    console.log("Done!");
  });
};

makeNextRequest();
