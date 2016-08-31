let RssFeedEmitter = require('rss-feed-emitter');
let feeder = new RssFeedEmitter();

function getSeveralDaysWeatherForecast() {
feeder.add({
  url: 'http://rss.weather.gov.hk/rss/SeveralDaysWeatherForecast.xml',
  refresh: 1
});

var weatherDescription = []
feeder.on('new-item', function(item) {
  weatherDescription = item.description.split('<p/>')

  var tempResult = []

  for (var i = 0; i < weatherDescription.length; i++) {
    tempResult.push(String(weatherDescription[i]).replace(/(\r\n|\n|\r|\t)/gm,"").trim());
  }

  var result = []
  for (var i = 0; i < tempResult.length; i++) {
    if (tempResult[i] != '') {
    result.push(tempResult[i].split(/[<]br[^>]*[>]/));
    }
  }
  console.log(result[0]);

})

}

getSeveralDaysWeatherForecast()

