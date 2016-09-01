var scrape = require('./scrape');
var Parse = require('parse/node').Parse;
 Parse.initialize('EthanIsTheBestCookInTheWorld', null,'YouDebt');
 Parse.serverURL = 'http://ethankitchen.herokuapp.com/parse/';
 Parse.Cloud.useMasterKey();

 var subscribe = {

}

subscribe.saveUserSubscribe = function(save, topics, userID, callback) {
  console.log("saveUserSubscribe");
  console.log(scrape.getTopics().split(','));
  console.log(topics);
  if (scrape.getTopics().split(', ').includes(topics)) {
  var body = {
    topics: topics,
    userID: userID,
    save: save
  }

  Parse.Cloud.run('saveUserSubscribe',body).then(function(res) {
    console.log("call cloud");
    console.log(res);
    callback(res);
  });
  } else {
    callback('We no support this topics');
  }

}

module.exports = subscribe;