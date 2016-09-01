var scrape = require('./scrape');
var parsingManager = require('./parsingManager');
var subscribe = require('./subscribe');
var TelegramBot = require('node-telegram-bot-api');

var token = '258413484:AAEjVM5urOploj6UfwdaewbzkB5TaPJN7oI';
var bot = new TelegramBot(token, {polling: true});
var language = "EN"; //Default


bot.onText(/enen/, function (msg,match) {
  var fromId = msg.from.id;
  var resp = match[1];

  bot.sendMessage(fromId, "hello hello");
});

bot.onText(/topics/, function (msg,match) {
  var fromId = msg.from.id;
  var result = scrape.getTopics();
  bot.sendMessage(fromId, result);
});


bot.onText(/tellme/, function (msg,match) {

  var fromId = msg.from.id;
  var topic = msg.text.split(' ')[1]
  parsingManager.getTopicUrl(topic, function(message){
    bot.sendMessage(fromId, message);
  })

});



bot.onText(/繁體中文|简体中文|English/, function (msg,match) {
  var fromId = msg.from.id;

  parsingManager.changeLanguage(msg.text, function(langu, msgBack){
    language = langu;
    bot.sendMessage(fromId, msgBack);

  })

});


bot.onText(/subscribe/, function (msg,match) {

  var fromId = msg.from.id;
  var subscribeDescription = msg.text.split(' ')[0];
  var subscribeOrNot;
  if (subscribeDescription === "subscribe") {
    subscribeOrNot = true;
  } else if (subscribeDescription === "unsubscribe"){
    subscribeOrNot = false;
  }

  subscribe.saveUserSubscribe(subscribeOrNot, msg.text.split(' ')[1], msg.from.id, function(backMsg){
    bot.sendMessage(fromId, backMsg);
  });

});



var interval = 24 * 3600 * 1000; // 24 hour

setInterval(function(){

  var allTopics = scrape.getTopics().split(', ');
  var topicIndex = 0;
  for (var i = 0; i < allTopics.length; i++) {


    subscribe.getTopicUsers(allTopics[topicIndex],function(result){
      var userIndex = 0;

      for (var j = 0; j < result.res.length; j++) {

        parsingManager.getTopicUrl(result.topic, function(message){
          bot.sendMessage(result.res[userIndex], message);

          userIndex++;
        });
      };


    });
    topicIndex++;
  };
}, interval);




