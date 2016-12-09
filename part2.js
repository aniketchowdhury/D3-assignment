var fs=require('fs');
var readl=require('readline');


const rl=readl.createInterface({

  input: fs.createReadStream('Indicators.csv','utf8')

});

var row=0,count=0,usum=0,rsum=0,year=1960;//flag=0;
var jsonarray1=[];
var asia=['ARB','SAS','KOR','IND','LBN','MYS','BGD','IDN'];

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
    var currentline=chunk.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    for(var i=0;i<header.length;i++)
    {
        if(header[i]=="Year")
        {
          for(var j=0;j<asia.length;j++)
          {
            if(currentline[i-3]==asia[j] && currentline[i-1]=="SP.URB.TOTL.IN.ZS")
            {
              usum+=parseFloat(currentline[i+1]);
            }
            if(currentline[i-3]==asia[j] && currentline[i-1]=="SP.RUR.TOTL.ZS")
            {
              rsum+=parseFloat(currentline[i+1]);
            }
          }
          if(currentline[i]>year){
            jsonobject1[header[i]]=year;
            jsonobject1["RuralPop"]=rsum;
            jsonobject1["Urbanpop"]=usum;
            jsonarray1.push(jsonobject1);rsum=0;usum=0;
            year++;
          }
        }
    }


    }

});

rl.on('close',function(){
  var json=JSON.stringify(jsonarray1);
  //var json2=JSON.stringify(jsonarray2);
  fs.writeFile('l20.json',json,function(err){});
  //fs.appendFile('line2.json',json2,function(err){});

});
