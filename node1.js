var fs=require('fs');
var readl=require('readline');


const rl=readl.createInterface({

  input: fs.createReadStream('Indicators.csv','utf8')

});

var row=0,count=0;//flag=0;
var jsonarray1=[];
//var jsonarray2=[];
var header=[];

rl.on('line',function(chunk){

  if(row==0)
  {
    header=chunk.split(',');
    row++;
  }
  else {
    var jsonobject1={};
    var jsonobject2={};

    var currentline=chunk.split(',');
    for(var i=0;i<header.length;i++)
    {
      if(header[i]=="IndicatorName"){
        if(currentline[i-1]=="IND" && (currentline[i+1]=="SP.URB.TOTL.IN.ZS" || currentline[i+1]=="SP.RUR.TOTL.ZS"))
        {
          jsonobject1[header[i]]=currentline[i];
          count=1;
        }
      /*  if((currentline[i-1]=="IND" || currentline[i-1]=="SAS") && currentline[i+1]=="SP.POP.TOTL")
        {
          jsonobject2[header[i]]=currentline[i];
          flag=1;
        }*/
        else{
        count=0;
        //flag=0;
        }
      }
      if(header[i]=="Year"){
        if(currentline[i-3]=="IND" && (currentline[i-1]=="SP.URB.TOTL.IN.ZS" || currentline[i-1]=="SP.RUR.TOTL.ZS"))
        {
          jsonobject1[header[i]]=currentline[i];
          count=1;
        }
      /*  if((currentline[i-3]=="IND" || currentline[i-3]=="SAS") && currentline[i-1]=="SP.POP.TOTL")
        {
          jsonobject2[header[i]]=currentline[i];
          flag=1;
        }*/
        else{
        count=0;
        //flag=0;
        }
      }
      if(header[i]=="Value"){
        if(currentline[i-4]=="IND" && (currentline[i-2]=="SP.URB.TOTL.IN.ZS" || currentline[i-2]=="SP.RUR.TOTL.ZS"))
        {
          jsonobject1[header[i]]=currentline[i];
          count=1;
        }
      /*  if((currentline[i-4]=="IND" || currentline[i-4]=="SAS") && currentline[i-2]=="SP.POP.TOTL")
        {
          jsonobject2[header[i]]=currentline[i];
          flag=1;
        }*/
        else{
        count=0;
        //flag=0;
        }
      }
    }
    if(count==1)
    jsonarray1.push(jsonobject1);
  //  if(flag==1)
  //  jsonarray2.push(jsonobject2);

  }

});

rl.on('close',function(){
  var json=JSON.stringify(jsonarray1);
  //var json2=JSON.stringify(jsonarray2);
  fs.appendFile('line1.json',json,function(err){});
  //fs.appendFile('line2.json',json2,function(err){});

});
