const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

// const tweeter = {};
// module.exports = tweeter;
module.exports = (cb) => {
  MongoClient.connect(MONGODB_URI, (err, db) => {

    if (err) {
      return cb(err);
    }

    const tweetsCollection = db.collection('tweets');

    const tweeter = {};

    tweeter.create = function create( tweet, cb ) {
      blah = tweetsCollection.insert(tweet, cb);
      console.log(blah);
      return blah;
    };

    tweeter.all = function all( cb ) {
      return tweetsCollection.find({}).toArray(cb);
    };

    // const closeConnection = function () {
    //   console.log("Closing connection");
    //   try {
    //     db.close();
    //   }

    //   catch (e) {
    //     console.error("Error while shutting down:", e.stack);
    //   }

    //   console.log("Bye!");
    //   process.exit();

    // };


    // process.on('SIGINT', closeConnection);
    // process.on('SIGTERM', closeConnection);

    cb(null, tweeter);

  });
};



// "use strict";

// const mongo = require('mongodb').MongoClient;

// mongo.connect('mongodb://localhost:27017/tweeter', function (err, db) {

//   if (err) {
//     throw err;
//   } else {

//     const tweets = db.collection('tweets');

//     tweets.all = function all (cb) {
//       console.log(db);
//     // find({}) will return all documents in "todos" collection
//     return todosCollection.find({}).toArray(cb);
//   };

//   }

//   db.close();

// });

// const dbMethods = {

//   saveTweet: (data) => {

//     db.tweets.push(data);
//     return true;
//   },

//   getTweets: () => {
//     return db.tweets.sort(function(a, b) { return a.created_at - b.created_at });
//   }

// }

// module.exports = {

//   connect: (onConnect) => {

//     onConnect(dbMethods);

//   }

// }