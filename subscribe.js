var scrape = require('./scrape');

var Parse = require('parse/node').Parse;
 Parse.initialize('EthanIsTheBestCookInTheWorld', null,'YouDebt');
 Parse.serverURL = 'http://ethankitchen.herokuapp.com/parse/';
 Parse.Cloud.useMasterKey();

 var subscribe = {

}

subscribe.saveUserSubscribe = function(save, topics, userID, callback) {
  console.log("saveUserSubscribe");

  if (scrape.getTopics().split(', ').includes(topics)) {
  var body = {
    topics: topics,
    userID: userID,
    save: save
  }

  Parse.Cloud.run('saveUserSubscribe',body).then(function(res) {

    callback(res);
  });
  } else {
    callback('We no support this topics');
  }

}

subscribe.getTopicUsers = function(topics, callback){

  var body = {
    topics: topics
  }
  Parse.Cloud.run('getTopicUsers',body).then(function(res) {

    var result = {
      topic: topics,
      res: res
    }

    callback(result);
  });
}

module.exports = subscribe;