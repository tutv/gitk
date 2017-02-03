'use strict';

const shell = require('shelljs');

module.exports.pull = function (dir, remote, branch) {
    remote = remote || 'origin';
    branch = branch || 'master';

    return new Promise((resolve, reject) => {
        shell.exec(`cd ${dir}; git pull ${remote} ${branch}`, {async: true}, (code, stdout, stderr) => {
            if (code == 0) {
                resolve(stdout);
            } else {
                reject(stderr);
            }
        });
    });
};