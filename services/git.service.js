'use strict';

const shell = require('shelljs');

module.exports.pull = function (dir, branch) {
    branch = branch || 'origin master';

    return new Promise((resolve, reject) => {
        console.log(`cd ${dir}; git pull ${branch}`);
        shell.exec(`cd ${dir}; git pull ${branch}`, {async: true}, (code, stdout, stderr) => {
            if (code == 0) {
                console.log(stdout);
                resolve(stdout);
            } else {
                console.log(stderr);
                reject(stderr);
            }
        });
    });
};