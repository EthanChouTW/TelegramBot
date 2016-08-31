var request = require('request');
var cheerio = require('cheerio');

request('http://rss.weather.gov.hk/rss/SeveralDaysWeatherForecast.xml', function (error, response, html) {
  if (!error && response.statusCode == 200) {

   var $ = cheerio.load(html, {
    xmlMode: true
  });


   weatherDescription = $('description').text().split('<p/>');

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
  console.log(result);
}
});