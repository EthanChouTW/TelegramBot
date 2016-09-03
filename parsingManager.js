var scrape = require('./scrape');
var request = require('request');
var cheerio = require('cheerio');

var parsingManager = {};
var cn = "";
var cnOrTw = "";
var langu = "TW"

parsingManager.changeLanguage = function(language, callback) {

  var msgBack;


  if (language === "繁體中文") {
    cn = "";
    cnOrTw = "_uc";
    langu = "TW";
    msgBack = "知道了"

  } else if (language === "简体中文"){
    cn = "gb";
    cnOrTw = "_uc";
    langu = "CN";
    msgBack = "知道了"
  } else {
    cn = "";
    cnOrTw = "";
    langu = "EN";
    msgBack = "No problem";
  }

  callback(langu,msgBack)
}




parsingManager.getTopicUrl = function(topic,callback) {
  var topics;

  if (topic === "current") {
    topics = "CurrentWeather";
  } else if (topic === "warning"){
    topics = "WeatherWarningBulletin";
  } else {
    return callback("We no support this topics");
  }

  var url = 'http://'+ cn +'rss.weather.gov.hk/rss/' + topics + cnOrTw + ".xml";

  request(url, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      parsingManager.parseHtmlByTopic(topic,html,function(message){
        callback(message);
      })
    } else {
      callback(error);
    }
  });

}



parsingManager.parseHtmlByTopic = function(topic,html,callback) {
  if (topic == "current") {

    scrape.parseCurrentWeather(langu, html,function(message){

      callback(message);
    })
  } else if (topic == "warning") {
    scrape.parseWarning(html,function(message){
      callback(message);
    })
  }
}

module.exports = parsingManager;
