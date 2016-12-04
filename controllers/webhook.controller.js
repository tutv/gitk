'use strict';

let controller = {};
let response = require('../services/response.service');
let modelProject = require('../model/project');
let gitService = require('../services/git.service');

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

    let repo = '';
    let host = '';

    if (user_agent.indexOf('GitHub') >= 0) {//GitHub
        let repository = req.body.repository;
        repo = repository.full_name;
        host = 'github';

    } else if (user_agent.indexOf('Bitbucket') >= 0) {//Bitbucket
        let repository = req.body.repository;
        repo = repository.full_name;
        host = 'bitbucket';
    }

    modelProject
        .find({
            host: host,
            repo: repo
        })
        .then(
            projects => {
                if (!projects) {
                    response.sendError(res, 'Project not found');
                    return;
                }

                for (let i = 0; i < projects.length; i++) {
                    let project = projects[i];
                    console.log(project);
                    gitService.pull(project.dir)
                        .then(
                            stdout => {
                                console.log(stdout);
                            },
                            stderr => {
                                console.error(stderr);
                            }
                        );
                }

                response.sendSuccess(res, projects);
            },
            error => {
                response.sendError(res, error);
            }
        );
};

module.exports = controller;