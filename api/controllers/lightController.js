"use strict";
var rp = require("./rpController");
var logger = require("../logger");
var light = require("./../models/lightModel");
var nightMode = require("./nightModeController");

logger.debug("Starting controller");
exports.getStatus = function(req, res) {
    logger.debug("in function getStatus start");
    res.json(light.data);
    logger.debug("in function getStatus end");
}

exports.changeStatus = function(req, res) {
    logger.debug("in function changeStatus start " + JSON.stringify(req.body));
    if(req.body) {
        var newStatus = req.body.status? req.body.status : "off";
        var speed = req.body? req.body.speed : null;
        let isNightMode = req.body.isNightMode? req.body.isNightMode : null;

        if(isNightMode !== null) {
            nightMode.enable(isNightMode);
        }
        else if(speed != null) {
            light.data = rp.changeSpeed(speed);
            res.json(light.data);
            logger.debug("in function speed end " + JSON.stringify(light.data));    
        }
        else {
            light.data = rp.light(newStatus, speed);
            res.json(light.data);
            logger.debug("in function changeStatus end " + JSON.stringify(light.data));
        }
    }
}

function start() {
    light.data = rp.light("on");
}
start();

