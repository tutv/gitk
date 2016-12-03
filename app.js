'use strict';

/**
 * Environments
 */
require('dotenv').config();

/**
 * Create server.
 */
const express = require('express');
const app = express();

/**
 * Add support POST for express.
 */
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

/**
 * Serve static.
 */
app.use(express.static(__dirname + '/public'));

/**
 * Routing
 */
const routes = require('./app.routes.js');
app.use('/api', routes.api);
app.use('/', routes.webhook);

/**
 * Listening.
 */
let port = process.env.HOST_PORT || 2369;
app.listen(port, function () {
    console.log('App listening on port ' + port);
});