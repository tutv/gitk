'use strict';

const Datastore = require('nedb');

let db = {};
db.projects = new Datastore({filename: 'databases/projects.db', autoload: true});

module.exports = db;