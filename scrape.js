var request = require('request');
var cheerio = require('cheerio');

var scrape = {};


scrape.parseCurrentWeather = function(langu,html,callback) {

  // for debug
  // var firstParagraph = html.split('<p>')[1].split('<br/>').join('')
  var $ = cheerio.load(html, {
    xmlMode: true
  });
  var secondParagraph = $(html.split('<p>')[2].split(']]>')[0]).text();


  var $ = cheerio.load(html, {
    xmlMode: true
  });

  var firstParagraph;
  console.log(langu);
  if (langu === "EN") {
  firstParagraph = $("description").last().first('p').text().split('<br/>').join('').split('<font')[0].split('<p>')[1];
  } else {
  firstParagraph = $("description").last().first('p').text().split('<br/>').join('').split('<font')[0].split(';">')[1].split('<p>')[1];
  }
  // if need other place
  var secondParagraph = $(html.split('<p>')[2].split(']]>')[0]).text();

   callback(firstParagraph);
 }

scrape.parseWarning = function(html,callback) {

 var $ = cheerio.load(html, {
  xmlMode: true
});

 var weatherDescription = []
 $('item > description').each(function(){
  weatherDescription.push($(this).text());
});


 var message = weatherDescription.join(', ').split('<br/>').join(' ');


 callback(message);
}


scrape.getTopics = function() {
  return ["current", "warning"].join(', ')
}

module.exports = scrape;


///************************//
/* if use RssFeedEmitter

// let RssFeedEmitter = require('rss-feed-emitter');
// let feeder = new RssFeedEmitter();

// function getSeveralDaysWeatherForecast() {
// feeder.add({
//   url: 'http://rss.weather.gov.hk/rss/SeveralDaysWeatherForecast.xml',
//   refresh: 1
// });

// var weatherDescription = []
// feeder.on('new-item', function(item) {
//   weatherDescription = item.description.split('<p/>')

//   var tempResult = []

//   for (var i = 0; i < weatherDescription.length; i++) {
//     tempResult.push(String(weatherDescription[i]).replace(/(\r\n|\n|\r|\t)/gm,"").trim());
//   }

//   var result = []
//   for (var i = 0; i < tempResult.length; i++) {
//     if (tempResult[i] != '') {
//     result.push(tempResult[i].split(/[<]br[^>]*[>]/));
//     }
//   }
//   console.log(result[0]);

// })

// }

// getSeveralDaysWeatherForecast()

*/