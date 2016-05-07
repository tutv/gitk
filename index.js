var Git = require('gity');
var config = require('./config');

// var puller = function (dir) {
//     return Git({
//         base: dir
//     }).pull('origin master');
// };
//
// puller(config.dir).run(function (err, res) {
//     if (err) {
//         console.log(err);
//     }
//
//     console.log(res);
// });

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
    res.send('hello world');
});

app.all('/', function (req, res) {
    console.log(req.body);
    res.json(req.body);
});

app.listen(2369, function () {
    console.log('http://localhost:9000');
});