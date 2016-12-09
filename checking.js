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
            if(asia.indexOf(currentline[i-3]) && currentline[i-1]=="SP.URB.TOTL.IN.ZS")
            {
              usum+=parseFloat(currentline[i+1]);console.log("usum"+usum);
            }
            if(asia.indexOf(currentline[i-3]) && currentline[i-1]=="SP.URB.TOTL.IN.ZS")
            {
              rsum+=parseFloat(currentline[i+1]);console.log("rsum"+rsum);
            }

          if(currentline[i]>year){
            jsonobject1[header[i]]=year;
            jsonobject1["Rural Pop"]=rsum;
            jsonobject1["Urban pop"]=usum;
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
  fs.writeFile('l21.json',json,function(err){});
  //fs.appendFile('line2.json',json2,function(err){});

});
