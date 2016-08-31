var request = require('request');
var cheerio = require('cheerio');
var cn = "";
var cnOrTw = "";
var topics = "CurrentWeather";
// var url = 'http://'+ cn +'rss.weather.gov.hk/rss/' + topics + cnOrTw + ".xml";

var scrape = {


}

scrape.changeLanguage = function(language, callback) {
  console.log(language);
  var msgBack;
  if (language === "繁體中文") {
    cn = "";
    cnOrTw = "_uc";
    msgBack = "知道了"

  } else if (language === "简体中文"){
    cn = "gb";
    cnOrTw = "_uc"
    msgBack = "知道了"
  } else {
    cn = ""
    cnOrTw = ""
    msgBack = "No problem"
  }

  callback(msgBack)
}

scrape.getSeveralDaysWeatherForecast = function(callback) {
  topics = "CurrentWeather"
  request('http://'+ cn +'rss.weather.gov.hk/rss/' + topics + cnOrTw + ".xml", function (error, response, html) {
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

scrape.getCurrentWeatherReport = function(callback) {
  topics = "CurrentWeather"
  console.log('http://'+ cn +'rss.weather.gov.hk/rss/' + topics + cnOrTw + ".xml");
  request('http://'+ cn +'rss.weather.gov.hk/rss/' + topics + cnOrTw + ".xml", function (error, response, html) {
    if (!error && response.statusCode == 200) {

      var firstParagraph = html.split('<p>')[1].split('<br/>').join('')
      console.log(html);

     var $ = cheerio.load(html, {
      xmlMode: true
    });
     var secondParagraph = $(html.split('<p>')[2].split(']]>')[0]).text();


}

   callback(error, firstParagraph, secondParagraph)
});

}


function getCurrentWeatherReport(callback) {
  topics = "CurrentWeather"
  console.log('http://'+ cn +'rss.weather.gov.hk/rss/' + topics + cnOrTw + ".xml");
  request('http://'+ cn +'rss.weather.gov.hk/rss/' + topics + cnOrTw + ".xml", function (error, response, html) {
    if (!error && response.statusCode == 200) {

      var firstParagraph = html.split('<p>')[1].split('<br/>').join('')
      console.log(html);

     var $ = cheerio.load(html, {
      xmlMode: true
    });
     var secondParagraph = $(html.split('<p>')[2].split(']]>')[0]).text();


}

   callback(error, firstParagraph, secondParagraph)
});

}

getCurrentWeatherReport(function(err,firstParagraph,secondParagraph){
  // console.log(secondParagraph);
})


scrape.getWeatherWarning = function(callback) {
  topics = "WeatherWarningBulletin"

  request('http://'+ cn +'rss.weather.gov.hk/rss/' + topics + cnOrTw + ".xml", function (error, response, html) {
    if (!error && response.statusCode == 200) {

     var $ = cheerio.load(html, {
      xmlMode: true
    });

     var weatherDescription = []
     $('item > description').each(function(){
      weatherDescription.push($(this).text());
     });

     var message = weatherDescription.join(', ');


}

   callback(error, message)
});

}

// getWeatherWarning(function(err,message){
//   // console.log(message);
// })

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