var scrape = require('./scrape');
var TelegramBot = require('node-telegram-bot-api');

var token = '258413484:AAEjVM5urOploj6UfwdaewbzkB5TaPJN7oI';
// Setup polling way
var bot = new TelegramBot(token, {polling: true});



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
  var fromId = msg.from.id;
  scrape.getWeatherWarning(function(err,message) {
    bot.sendMessage(fromId, message);
  });
});

