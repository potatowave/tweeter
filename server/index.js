"use strict";

const PORT        = 8080;
const express     = require("express");
const bodyParser  = require("body-parser");
const app         = express();

const tweetsApi  = require('./api/tweets');
const db         = require('./lib/db');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

db((err, tweeter) => {
  if(err) {
    console.error(err.message);
    return process.exit(1);
  }

  app.use('/tweets', tweetsApi(tweeter));

  app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
  });
});