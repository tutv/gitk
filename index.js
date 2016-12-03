"use strict";

let express = require('express');
let app = express();

let bodyParser = require('body-parser');
let multer = require('multer');
let upload = multer();
let _puller = require('./puller');
let shell = require('shelljs');
let Puller = _puller.Puller;

let git_exe = shell.which('git');
if (!git_exe) {
    console.log('Sorry, this script requires git');
    shell.exit(1);
}

let db = require('./db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

/**
 * Init git puller
 * @type {Puller}
 */
let gitPuller = new Puller(shell);

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.all('/catch', function (req, res) {
    if (!req.body) {
        res.status(404).send();
        return;
    }

    let user_agent = req.header('user-agent');
    if (!user_agent) {
        res.status(404).send();
        return;
    }

    if (user_agent.indexOf('GitHub') >= 0) {//GitHub
        let repository = req.body.repository;
        let full_name = repository.full_name;

        db.repos.find({
            host: 'github',
            repo: full_name
        }, function (err, docs) {
            for (let i = 0; i < docs.length; i++) {
                let sync = docs[i];
                gitPuller.setDir(sync.dir);
                gitPuller.pull('origin master');
                gitPuller.exec(sync.after)
            }

            res.json(docs.length);
        });
    } else if (user_agent.indexOf('Bitbucket') >= 0) {//Bitbucket
        let repository = req.body.repository;
        let full_name = repository.full_name;

        db.repos.find({
            host: 'bitbucket',
            repo: full_name
        }, function (err, docs) {
            for (let i = 0; i < docs.length; i++) {
                let sync = docs[i];
                gitPuller.setDir(sync.dir);
                gitPuller.pull('origin master');
                gitPuller.exec(sync.after);
            }

            res.json(docs.length);
        });
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

app.post('/create', upload.array(), function (req, res) {
    let body = req.body;

    if (!body.repo || body.repo === '') {
        res.status(404).send();
        return;
    }
    if (!body.dir || body.dir === '') {
        res.status(404).send();
        return;
    }
    if (!body.host || body.host === '') {
        res.status(404).send();
        return;
    }

    let repo = body.repo;
    let dir = body.dir;
    let host = body.host;
    let after_pull = body.after ? body.after : '';
    let newSync = {
        repo: repo,
        dir: dir,
        host: host,
        after: after_pull
    };

    db.repos.find(newSync, function (err, docs) {
        if (docs.length > 0) {
            res.json({
                return: false,
                msg: 'Exist!'
            });
        } else {
            db.repos.insert(newSync, function (err, newDoc) {
                res.json({
                    return: true,
                    msg: 'Success',
                    response: newDoc
                });
            });
        }
    });
});

app.get('/delete/:id', function (req, res) {
    let id = req.params.id;
    db.repos.remove({_id: id}, {}, function (err, num) {
        if (num > 0) {
            res.json({
                return: true,
                msg: 'Success!'
            });
        } else {
            res.json({
                return: false,
                msg: 'Error!'
            });
        }

    });
});

app.get('/auth', function (req, res) {
    let code = req.query.code;

    if (!code) {
        res.status(404).send();
        return;
    }
});

app.use(express.static(__dirname + '/public'));

app.listen(2369, function () {
    console.log('http://localhost:2369');
});