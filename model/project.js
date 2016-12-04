'use strict';

let db = require('../app.databases');
let projects = db.projects;
let model = {};

model.list = function () {
    return new Promise((resolve, reject) => {
        projects.find({}, function (error, projects) {
            if (error) {
                reject(error);
            } else {
                resolve(projects);
            }
        })
    });
};

model.create = function (project) {
    project.enable = true;

    return new Promise((resolve, reject) => {
        projects.insert(project, function (error, newProject) {
            if (error) {
                reject(error);
            } else {
                resolve(newProject);
            }
        })
    });
};

model.remove = function (id) {
    return new Promise((resolve, reject) => {
        projects.remove({_id: id}, function (err, number) {
            if (err) {
                reject('Remove failed');
            } else {
                if (number == 0) {
                    reject('Project not found');
                } else {
                    resolve(id);
                }
            }
        });
    });
};

module.exports = model;