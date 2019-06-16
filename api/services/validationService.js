var errorCodes = require('./../constants');

module.exports.checkValidSpeedReq = function(body) {
    if(!body || !body.speed) {
        return errorCodes.BAD_REQUEST;
    }
    let speed = body.speed;
    if(speed < 0 || speed > 5) {
        return errorCodes.UNPROCESSABLE_ENTITY;
    }
    return null;
};

module.exports.checkValidLightReq = function(body) {
    if(!body || !body.status) {
        return errorCodes.BAD_REQUEST;
    }
    let status = body.status;
    if(status !== "on" && status !== "off") {
        return errorCodes.UNPROCESSABLE_ENTITY;
    }
    return null;
};

module.exports.checkValidModeReq = function(body) {
    if(!body || !body.mode) {
        return errorCodes.BAD_REQUEST;
    }
    if(body.mode !== "night" || body.mode !== "default") {
        return errorCodes.UNPROCESSABLE_ENTITY;
    }
    return null;
};