"use strict";
var rp = require("./rpController");
var logger = require("../logger");
var lightModel = require("./../models/lightModel");
var validation = require("./../services/validationService");
var httpCodes = require("./../constants");

logger.debug("Starting controller");
exports.getStatus = function(req, res) {
    logger.debug("in function getStatus start " + JSON.stringify(lightModel.data));
    res.json(lightModel.data);
}

exports.changeStatus = function(req, res) {
    logger.debug("in function changeStatus start " + JSON.stringify(req.body));
    let error = validation.checkValidLightReq(req.body);
    if(error) {
        logger.debug("in function changeStatus error " + JSON.stringify(error));
        res.status(error.code).json(error);
    }
    else {
        let result = rp.light(req.body.status, lightModel.data.speed);
        lightModel.data.status = result.status;
        logger.debug("in function changeStatus end " + JSON.stringify(lightModel.data));
        res.status(httpCodes.SUCCESS.code).json(lightModel.data);
    }
}

function start() {
    logger.debug("Initial Start");
    lightModel.data = rp.light("on");
    lightModel.data.startTime = 18;
    lightModel.data.stopTime = 22;
    lightModel.data.mode = "default";
}
start();

