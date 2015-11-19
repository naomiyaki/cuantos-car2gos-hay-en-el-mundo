var https = require('https');
var cheerio = require('cheerio');

var pageHTML = ''
var cuantos = 0;

https.get('https://en.wikipedia.org/wiki/Car2Go', function(res){
  res.on('data', function(d){
    pageHTML += d.toString();
  });
  res.on('error', function(e){
    console.error(e);
  });
  res.on('end', function(){
    startTable = pageHTML.indexOf('<table class="wikitable sortable">');
    endTable = pageHTML.indexOf('</table>', startTable) + 8;
    $ = cheerio.load(pageHTML.substring(startTable, endTable));
    $('tr').each(function(){
      var dataCell = ($(this).find('td')[2]);
      if (dataCell) {
        quantity = $(dataCell).text().replace(',', '');
        cuantos += Number(quantity);
      }
    });
    console.log("¿Cuantós Car2Gos Hay En El Mundo, cuantós?");
    console.log("Hay: " + cuantos);
  });
});
