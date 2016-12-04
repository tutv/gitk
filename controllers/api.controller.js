'use strict';

let modelProject = require('../model/project');
let validator = require('../services/validator.service.js');
let response = require('../services/response.service');
let controller = {};

controller.create = (req, res, next) => {
    validator
        .project(req)
        .then(
            body => {
                modelProject
                    .create(body)
                    .then(
                        data => {
                            response.sendSuccess(res, data);
                        },
                        err => {
                            response.sendError(res, err);
                        }
                    );
            },
            error => {
                response.sendError(res, error);
            }
        );
};

controller.remove = (req, res, next) => {
    let id = req.params.id;

    modelProject.remove(id)
        .then(
            result => {
                response.sendSuccess(res, result);
            },
            error => {
                response.sendError(res, error);
            }
        )
};

controller.list = (req, res, next) => {
    modelProject.list()
        .then(
            data => {
                response.sendSuccess(res, data);
            },
            error => {
                response.sendError(res, error);
            }
        );
};

module.exports = controller;