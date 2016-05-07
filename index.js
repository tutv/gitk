var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
    res.send('hello world');
});

app.all('/catch', function (req, res) {
    if (!req.body) {
        res.status(404);
        return;
    }

    var user_agent = req.header('user-agent');
    if (!user_agent) {
        res.status(404);
        return;
    }
    if (user_agent.indexOf('GitHub') >= 0) {//GitHub
        var repository = req.body.repository;

        console.log(repository);
        res.json(repository);
    } else if (user_agent.indexOf('Bitbucket') >= 0) {//Bitbucket

    } else {//Other
        res.status(404);
    }
});

app.listen(2369, function () {
    console.log('http://localhost:2369');
});