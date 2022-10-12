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
  crypto = require("crypto"),
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
  res.status(200).send(challenge);
});

// Create the endpoint for your webhook
app.post("/webhook", (req, res) => {
  let body = req.body;
  console.log(`\u{1F7EA} Received webhook:`);
  console.dir(body, { depth: null });
});
