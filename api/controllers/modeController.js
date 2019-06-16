"use strict";
var logger = require("../logger");
var validation = require("./../services/validationService");
var httpCodes = require('./../constants');
var lightModel = require("./../models/lightModel");
var nightMC = require("./nightModeController");

module.exports.changeMode = function(req, res) {
    let error = validation.checkValidModeReq(req.body);
    if(error) {
        logger.debug("changeMode error: " + JSON.stringify(error));
        res.status(error.code).json(error);
    }
    else {
        let result = nightMC.enable((req.body.mode === "night"));        
        lightModel.data.mode = result.mode;
        logger.debug("changeMode success: " + JSON.stringify(lightModel.data));
        res.status(httpCodes.SUCCESS.code).json(lightModel.data);
    }
}