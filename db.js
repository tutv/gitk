var Datastore = require('nedb');

var db = {};
db.repos = new Datastore({filename: 'databases/repos.db', autoload: true});

module.exports = db;