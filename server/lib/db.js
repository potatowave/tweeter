const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const MONGODB_URI = 'mongodb://localhost:27017/tweeter';

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

            return tweetsCollection.insert(tweet, cb);
        };

        tweeter.all = function all( cb ) {
            return tweetsCollection.find({}).toArray(cb);
        };

        cb(null, tweeter);

    });
};