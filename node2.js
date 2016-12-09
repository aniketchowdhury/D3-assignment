var fs = require("fs");

var data = fs.readFileSync('Indicators.csv','utf-8');

var lines=[];
lines=  data.split("\n");


var headers=lines[0].split(",");

reqHeader=[];
var index=[];
for(var i=1;i<lines.length;i++){

 headers.hasOwnProperty("");

}

console.log(headers);



for(var i=1;i<lines.length;i++){

    var obj = {};
    var currentline=lines[i].split(",");

    for(var j=0;j<headers.length;j++){
        obj[headers[j]] = currentline[j];
    }

    result.push(obj);

}

console.log(result);
