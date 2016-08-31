var request = require('request');
var cheerio = require('cheerio');

function getSeveralDaysWeatherForecast(callback) {
  request('http://rss.weather.gov.hk/rss/CurrentWeather.xml', function (error, response, html) {
    if (!error && response.statusCode == 200) {

     var $ = cheerio.load(html, {
      xmlMode: true
    });

     weatherDescription = $('description').text().split('<p/>');
     // console.log(weatherDescription);
     var tempResult = []

     for (var i = 0; i < weatherDescription.length; i++) {
      tempResult.push(String(weatherDescription[i]).replace(/(\r\n|\n|\r|\t)/gm,"").trim());
    }
    // console.log(tempResult);
    var result = []
    for (var i = 0; i < tempResult.length; i++) {
      if (tempResult[i] != '') {
        result.push(tempResult[i].split(/[<]br[^>]*[>]/));
      }
    }

  }
   callback(error,result)
});

}

// getSeveralDaysWeatherForecast(function(err,result){
//   // console.log(result);
// })

function getCurrentWeatherReport(callback) {
  request('http://rss.weather.gov.hk/rss/CurrentWeather.xml', function (error, response, html) {
    if (!error && response.statusCode == 200) {

      var firstParagraph = html.split('<p>')[1].split('<br/>').join('')
      // console.log(p);

     var $ = cheerio.load(html, {
      xmlMode: true
    });
     var secondParagraph = $(html.split('<p>')[2].split(']]>')[0]).text();

     // console.log(html);
     // var weatherDescription = []
     // $('description').each(function(){
     //  weatherDescription.push($(this).html());
     // });
     // var newHTML = weatherDescription[1].replace(/<!\[CDATA\[([^\]]+)]\]>/ig, "$1");
     // // console.log(newHTML);
     // var tempResult = []
     // tempResult = $(newHTML).find('p').text().replace(/(\r\n|\n|\r|\t)/gm,"").trim().split(';');
     // console.log(tempResult);
     // var arr = $(weatherDescription[1]);

     // var arr = []
     // arr.push(weatherDescription[1].split('</p>'));
     // console.log($('description').last().text());


}

   callback(error, firstParagraph, secondParagraph)
});

}

getCurrentWeatherReport(function(err,firstParagraph,secondParagraph){
  console.log(secondParagraph);
})




function getWeatherWarning(callback) {
  request('http://rss.weather.gov.hk/rss/WeatherWarningBulletin.xml', function (error, response, html) {
    if (!error && response.statusCode == 200) {

     var $ = cheerio.load(html, {
      xmlMode: true
    });

     var weatherDescription = []
     $('item > description').each(function(){
      weatherDescription.push($(this).text());
     });

     var message = weatherDescription.join(',');


}

   callback(error, message)
});

}

// getWeatherWarning(function(err,message){
//   // console.log(message);
// })





// if use RssFeedEmitter

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