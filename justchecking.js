var fs=require('fs');
var readl=require('readline');


const rl=readl.createInterface({

  input: fs.createReadStream('Indicators.csv','utf8')

});

var row=0,count=0;
var jsonarray=[];
var header=[];

rl.on('line',function(chunk){

  if(row==0)
  {
    header=chunk.split(',');
    row++;
  }
  else {
    var jsonobject={};

    var currentline=chunk.split(',');
    for(var i=0;i<header.length;i++)
    {
      if(header[i]=="IndicatorName"){
        if(currentline[i-1]=="IND" && (currentline[i+1]=="SP.URB.TOTL.IN.ZS" || currentline[i+1]=="SP.RUR.TOTL.ZS"))
        {
          jsonobject[header[i]]=currentline[i];
          jsonarray.push(jsonobject);
        }

      }
      if(header[i]=="Year"){
        if(currentline[i-3]=="IND" && (currentline[i-1]=="SP.URB.TOTL.IN.ZS" || currentline[i-1]=="SP.RUR.TOTL.ZS"))
        {
          jsonobject[header[i]]=currentline[i];
          jsonarray.push(jsonobject);
        }

      }
      if(header[i]=="Value"){
        if(currentline[i-4]=="IND" && (currentline[i-2]=="SP.URB.TOTL.IN.ZS" || currentline[i-2]=="SP.RUR.TOTL.ZS"))
        {
          jsonobject[header[i]]=currentline[i];
          jsonarray.push(jsonobject);
        }

      }
    }
    //if(count==1)

  }

});

rl.on('close',function(){
  var json=JSON.stringify(jsonarray);
  fs.appendFile('justchecking.json',json,function(err){});

});
