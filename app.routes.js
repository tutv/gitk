'use strict';

const express = require('express');
const api = express();
const webhook = express();
const apiController = require('./controllers/api.controller');
const webhookController = require('./controllers/webhook.controller');

/**
 * API
 */
module.exports.api = api;

api.post('/create', apiController.create);

api.get('/remove', apiController.remove);

api.get('/list', apiController.list);

/**
 * Webhook
 */
module.exports.webhook = webhook;
webhook.post('/', webhookController.callback);