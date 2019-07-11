"use strict";
var logger = require("../logger");
var validation = require("../services/validationService");
var httpCodes = require('../constants');
var lightModel = require("../models/lightModel");
var nightMC = require("./nightModeController");

module.exports.changeDuration = function(req, res) {
    let error = validation.checkValidDurationRequest(req.body);
    if(error) {
        logger.debug("changeDuration error: " + JSON.stringify(error));
        res.status(error.code).json(error);
    }
    else {
        nightMC.changeDuration(req.body.startTime, req.body.stopTime);
        logger.debug("changeMode success: " + JSON.stringify(lightModel.data));
        res.status(httpCodes.SUCCESS.code).json(lightModel.data);
    }
}