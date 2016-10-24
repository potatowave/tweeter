'use strict';

const User    = require('../lib/user-helper');
const express = require('express');
const router  = express.Router();
// const tweeter = require("../lib/db");

module.exports = function(tweeter) {

    router.get('/', function(req, res) {
        tweeter.all((err, tweetdata) => {
            if (err) {
                res.status(500);
                return res.json({error: err.message});
            }
            res.json(tweetdata);
        });
    });

    router.post('/', function(req, res) {
        if (!req.body.text) {
            res.status(400);
            return res.json({error: 'invalid request'});
        }

        const user = req.body.user ? req.body.user : User.generateRandomUser();
        const tweet = {
            user: user,
            content: { text: req.body.text },
            created_at: Date.now()
        };

        tweeter.create(tweet, (err, data) => {
            if (err) {
                res.status(500);
                return res.json({error: err.message});
            }
            res.json({status: 'ok', data });
        });
    });

    return router;

};
