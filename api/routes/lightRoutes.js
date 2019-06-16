"use strict";
module.exports = function(app) {
    var homeLight = require("../controllers/lightController");
    var speedCont = require("../controllers/speedController");
    var modeCont = require("./../controllers/modeController");
    app.route("/light")
        .get(homeLight.getStatus)
        .post(homeLight.changeStatus);

    app.route("/speed")        
        .post(speedCont.changeSpeed);

    app.route("/mode")        
        .post(modeCont.changeMode);  
}