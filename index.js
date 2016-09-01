var scrape = require('./scrape');
var subscribe = require('./subscribe');
var TelegramBot = require('node-telegram-bot-api');

var token = '258413484:AAEjVM5urOploj6UfwdaewbzkB5TaPJN7oI';

var bot = new TelegramBot(token, {polling: true});


// 繁中，簡中，英文
// http://rss.weather.gov.hk/rss/WeatherWarningBulletin_uc.xml
// http://gbrss.weather.gov.hk/rss/WeatherWarningBulletin_uc.xml
// http://rss.weather.gov.hk/rss/WeatherWarningBulletin.xml


//
// http://rss.weather.gov.hk/rss/CurrentWeather.xml
// http://rss.weather.gov.hk/rss/CurrentWeather_uc.xml
// http://gbrss.weather.gov.hk/rss/CurrentWeather_uc.xml

bot.onText(/enen/, function (msg,match) {
  var fromId = msg.from.id;
  var resp = match[1];
  // console.log(match);
  bot.sendMessage(fromId, "hello hello");
});

bot.onText(/topics/, function (msg,match) {
  var fromId = msg.from.id;
  var result = scrape.getTopics();
  bot.sendMessage(fromId, result);
});

bot.onText(/tellme current/, function (msg,match) {
  var fromId = msg.from.id;
  scrape.getCurrentWeatherReport(function(err,firstParagraph,secondParagraph){
      bot.sendMessage(fromId, firstParagraph);
      bot.sendMessage(fromId, secondParagraph);
  });
});

bot.onText(/tellme warning/, function (msg,match) {
  console.log(msg.text.split(' ')[1]);
  var fromId = msg.from.id;
  scrape.getWeatherWarning(function(err,message) {
    console.log(message);
    bot.sendMessage(fromId, message);
  });
});

bot.onText(/繁體中文|简体中文|English/, function (msg,match) {
  var fromId = msg.from.id;
  console.log(msg.text);

  scrape.changeLanguage(msg.text, function(msgBack){
    console.log(msgBack);
    bot.sendMessage(fromId, msgBack);
  })

});

bot.onText(/^subscribe warning/, function (msg,match) {
  var fromId = msg.from.id;
console.log('w');
  subscribe.saveUserSubscribe(true, msg.text.split(' ')[1], msg.from.id, function(backMsg){
    bot.sendMessage(fromId, backMsg);
  });

});

bot.onText(/^subscribe current/, function (msg,match) {
  var fromId = msg.from.id;
console.log(' c');
  subscribe.saveUserSubscribe(true, msg.text.split(' ')[1], msg.from.id, function(backMsg){
    bot.sendMessage(fromId, backMsg);
  });

});

bot.onText(/^unsubscribe warning/, function (msg,match) {
  var fromId = msg.from.id;
  console.log('un w');
  subscribe.saveUserSubscribe(false, msg.text.split(' ')[1], msg.from.id, function(backMsg){
    bot.sendMessage(fromId, backMsg);
  });

});

bot.onText(/^unsubscribe current/, function (msg,match) {
  var fromId = msg.from.id;
console.log('un c');
  subscribe.saveUserSubscribe(false, msg.text.split(' ')[1], msg.from.id, function(backMsg){
    bot.sendMessage(fromId, backMsg);
  });

});

