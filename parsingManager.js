var scrape = require('./scrape');
var request = require('request');
var cheerio = require('cheerio');

var parsingManager = {};
var cn = "";
var cnOrTw = "";
var langu = "TW"

parsingObject = {
  language;
  topic;
  url;
}

language = {
  cn;
  cnOrTw;
  langu;
  msgBack;
}

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

  scrape.request(url, callback);


}



parsingManager.parseHtmlByTopic = function(topic,html,callback) {
  scrape.accept(topic, callback)

}

module.exports = parsingManager;
