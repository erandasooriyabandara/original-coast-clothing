/**
 * Copyright 2021-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Messenger For Original Coast Clothing
 * https://developers.facebook.com/docs/messenger-platform/getting-started/sample-apps/original-coast-clothing
 */

"use strict";

// Import dependencies and set up http server
const express = require("express"),
  bp = require("body-parser"),
  config = require("./services/config"),
  path = require("path"),
  app = express();

var users = {};

app.use(bp.json());
// Parse application/x-www-form-urlencoded
app.use(
  bp.urlencoded({
    extended: true
  })
);

// Serving static files in Express
app.use(express.static(path.join(path.resolve(), "public")));

// Set template engine in Express
app.set("view engine", "ejs");

// Respond with index file when a GET request is made to the homepage
app.get("/", function(_req, res) {
  res.render("index");
});

// Add support for GET requests to our webhook
app.get("/webhook", (req, res) => {
  console.log("WEBHOOK_VERIFIED");
  res.status(200).send("WEBHOOK_VERIFIED");
});

// Create the endpoint for your webhook
app.post("/webhook", (req, res) => {
  let body = req.body;
  console.log(`\u{1F7EA} Received webhook:`);
  console.dir(body, { depth: null });
  res.status(200).send("EVENT_RECEIVED");
});

config.checkEnvVariables();

// Listen for requests :)
var listener = app.listen(config.port, function () {
  console.log(`The app is listening on port ${listener.address().port}`);
  if (
    Object.keys(config.personas).length == 0 &&
    config.appUrl &&
    config.verifyToken
  ) {
    console.log(
      "Is this the first time running?\n" +
        "Make sure to set the both the Messenger profile, persona " +
        "and webhook by visiting:\n" +
        config.appUrl +
        "/profile?mode=all&verify_token=" +
        config.verifyToken
    );
  }

  if (config.pageId) {
    console.log("Test your app by messaging:");
    console.log(`https://m.me/${config.pageId}`);
  }
});
