"use strict";
var rp = require("./rpController");
var logger = require("../logger");
var light = require("./../models/lightModel");

logger.debug("Starting controller");
exports.getStatus = function(req, res) {
    logger.debug("in function getStatus start");
    res.json(light.data);
    logger.debug("in function getStatus end");
}

exports.changeStatus = function(req, res) {
    logger.debug("in function changeStatus start " + JSON.stringify(req.body));
    var newStatus = req.body? req.body.status : null;
    var speed = req.body? req.body.speed : null;
    light.data = rp.light(newStatus, speed);
    res.json(light.data);
    logger.debug("in function changeStatus end " + JSON.stringify(newStatus));
}

function start() {
    light.data = rp.light("on");
}
start();

