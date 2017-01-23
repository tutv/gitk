'use strict';

const shell = require('shelljs');

module.exports.pull = function (dir, branch) {
    branch = branch || '';

    return new Promise((resolve, reject) => {
        shell.exec(`cd ${dir}; git pull ${branch}`, {async: true}, (code, stdout, stderr) => {
            if (code == 0) {
                resolve(stdout);
            } else {
                reject(stderr);
            }
        });
    });
};