var minSize = Infinity, maxSize = Infinity;
var minColor = Infinity, maxColor = -Infinity;

for(var i = 0; i < data.length; i++){
  var d = data[i];

  d.risk = d["Beta:"];
  d.reward = parseFloat(d["1y Target Est:"])/parseFloat(d["Prev Close:"]);

  d.color = d["P/E (ttm):"] ==  "N/A" ? 0 : parseFloat(d["P/E (ttm):"]);

  d.size = getNumber(d["Market Cap:"]);
  console.log(d.color);

}

data.sort(function(a,b){
  b.color - a.color;
});

for (var i = 0; i < data.length; i++) {
  data[i].color = i/(data.length/5);
}


data.sort(function(a,b){
  b.size - a.size;
});

for (var i = 0; i < data.length; i++) {
  data[i].size = i/(data.length/5);
}

console.log(data);

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
