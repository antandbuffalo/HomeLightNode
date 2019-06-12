"use strict";
module.exports = function(app) {
    var homeLight = require("../controllers/lightController");
    app.route("/light")
        .get(homeLight.getStatus)
        .post(homeLight.changeStatus);
    
}