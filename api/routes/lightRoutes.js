"use strict";
module.exports = function(app) {
    var lightController = require("../controllers/lightController");
    var speedController = require("../controllers/speedController");
    var modeController = require("./../controllers/modeController");
    var durationController = require("./../controllers/durationController");
    app.route("/light")
        .get(lightController.getStatus)
        .post(lightController.changeStatus);

    app.route("/speed")
        .post(speedController.changeSpeed);

    app.route("/mode")
        .post(modeController.changeMode);

    app.route("/duration")
        .post(durationController.changeDuration);
}