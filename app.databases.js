'use strict';

const Datastore = require('nedb');

let db = {};
db.repos = new Datastore({filename: 'databases/repos.db', autoload: true});

module.exports = db;