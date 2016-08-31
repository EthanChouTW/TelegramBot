var TelegramBot = require('node-telegram-bot-api');

var token = '258413484:AAEjVM5urOploj6UfwdaewbzkB5TaPJN7oI';
// Setup polling way
var bot = new TelegramBot(token, {polling: true});

// bot.onText(/\/start/, message => {
//   console.log(message); // for debug
//   const chatId = message.chat.id;

//   bot.sendMessage(chatId, 'Hello World');
// });


// Matches /echo [whatever]
bot.onText(/enen/, function (msg,match) {
  var fromId = msg.from.id;
  var resp = match[1];
  // console.log(match);
  bot.sendMessage(fromId, "hello hello");
});

// // Matches /echo [whatever]
// bot.onText(/\/echo (.+)/, function (msg, match) {
//   var fromId = msg.from.id;
//   var resp = match[1];
//   bot.sendMessage(fromId, resp);
// });

