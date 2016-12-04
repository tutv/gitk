'use strict';

module.exports.sendSuccess = (res, data) => {
    res.json({
        success: true,
        data: data,
    })
};

module.exports.sendError = (res, error) => {
    res.json({
        success: false,
        data: error
    });
};