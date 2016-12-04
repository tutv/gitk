'use strict';

module.exports.project = (req) => {
    req.checkBody('repo', 'required').notEmpty();
    req.checkBody('host', 'required').notEmpty();
    req.checkBody('dir', 'required').notEmpty();

    return new Promise((resolve, reject) => {
        req.getValidationResult().then(
            (result) => {
                if (!result.isEmpty()) {
                    reject(result.array());
                } else {
                    resolve(req.body);
                }
            },
            (error) => {
                reject(error);
            }
        );
    });
};