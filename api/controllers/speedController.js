"use strict";
var rp = require("./rpController");
var logger = require("../logger");
var light = require("./../models/lightModel");
var validation = require("./../services/validationService");
var httpCodes = require('./../constants');
var lightModel = require("./../models/lightModel");

module.exports.changeSpeed = function(req, res) {
    let error = validation.checkValidSpeedReq(req.body);
    if(error) {
        logger.debug("changeSpeed error: " + JSON.stringify(light.data));
        res.status(error.code).json(error);
    }
    else {
        let result = rp.changeSpeed(req.body.speed);
        lightModel.data.speed = result.speed;
        logger.debug("changeSpeed success: " + JSON.stringify(light.data));
        res.status(httpCodes.SUCCESS.code).json(light.data);
    }
}