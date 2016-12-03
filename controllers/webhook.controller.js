'use strict';

let controller = {};

controller.callback = function (req, res, next) {
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
};

module.exports = controller;