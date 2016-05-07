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

app.all('/catch', function (req, res) {
    if (!req.body) {
        res.send(404);
        return;
    }
    req.accepts('application/json');
    console.log(req.body);

    res.json(req.body);
});

app.listen(2369, function () {
    console.log('http://localhost:2369');
});