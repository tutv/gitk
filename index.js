var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var _puller = require('./puller');
var shell = require('shelljs');
var Puller = _puller.Puller;
var config = require('./config');

var git_exe = shell.which('git');
if (!git_exe) {
    console.log('Sorry, this script requires git');
    shell.exit(1);
}

var passport = require('passport'),
    util = require('util'),
    BitbucketStrategy = require('passport-bitbucket-oauth2').Strategy;
var BITBUCKET_CLIENT_ID = "MEuemHGp624aGbk3JL";
var BITBUCKET_CLIENT_SECRET = "KA5yYJeKCxDGPghgeRTczNftKuUMnqCX";

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

passport.use(new BitbucketStrategy({
        clientID: BITBUCKET_CLIENT_ID,
        clientSecret: BITBUCKET_CLIENT_SECRET,
        callbackURL: "http://188.166.233.156:2369/auth/bitbucket/callback"
    },
    function (token, tokenSecret, profile, done) {
        // asynchronous verification, for effect...

        db.repos.insert(token, function (err, newDoc) {
            console.log(newDoc);
        });

        process.nextTick(function () {

            // To keep the example simple, the user's Bitbucket profile is returned to
            // represent the logged-in user.  In a typical application, you would want
            // to associate the Bitbucket account with a user record in your database,
            // and return that user instead.
            return done(null, profile);
        });
    }
));

app.get('/auth/bitbucket',
    passport.authenticate('bitbucket'),
    function (req, res) {
        // The request will be redirected to Bitbucket for authentication, so this
        // function will not be called.
    });

app.get('/auth/bitbucket/callback',
    passport.authenticate('bitbucket', {failureRedirect: '/login'}),
    function (req, res) {
        res.redirect('/');
    });


var db = require('./db');
// db.repos.insert({
//     repo: 'https://github.com/tutv95/test_gitk',
//     dir: '/home/nodeapp/test_gitk'
// }, function (err, newDoc) {
//     console.log(newDoc);
// });

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

app.get('/all', function (req, res) {
    db.repos.find({}, function (err, docs) {
        if (err) {
            console.log(err);

            res.json(err);
            return;
        }

        res.json(docs);
    });
});

app.get('/auth', function (req, res) {
    var code = req.query.code;

    if (!code) {
        res.status(404).send();
        return;
    }


});

app.use(express.static(__dirname + '/public'));

app.listen(2369, function () {
    console.log('http://localhost:2369');
});