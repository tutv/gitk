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

module.exports = model;