var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var _puller = require('./puller');
var shell = require('shelljs');
var Puller = _puller.Puller;
var config = require('./config');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

/**
 * Init git puller
 * @type {Puller}
 */
var gitPuller = new Puller(shell);
gitPuller.setDir(config.dir);

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.all('/catch', function (req, res) {
    if (!req.body) {
        res.status(404).send();
        return;
    }

    var user_agent = req.header('user-agent');
    if (!user_agent) {
        res.status(404).send();
        return;
    }

    if (user_agent.indexOf('GitHub') >= 0) {//GitHub
        var pull_result = gitPuller.pull('origin master');

        res.json(pull_result);
    } else if (user_agent.indexOf('Bitbucket') >= 0) {//Bitbucket
        pull_result = gitPuller.pull('origin master');

        res.json(pull_result);
    } else {//Other
        res.status(404).send();
    }
});

app.use(express.static(__dirname + '/public'));

app.listen(2369, function () {
    console.log('http://localhost:2369');
});