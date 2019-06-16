var rpController = require("./rpController");
var lightModel = require("./../models/lightModel"); 
var logger = require("../logger");
let timer, ONE_SEC = 1000, scheduleTime, HALF_DAY = 12 * 60 * 60 * 1000;

function isNightHours(currentDate) {
    if(currentDate.getHours() > 17 || currentDate.getHours() < 6) {
        return true;
    }
    return false;
};
function isExactNightHours(currentDate) {
    return currentDate.getHours() == 6 || currentDate.getHours() == 18;
};
function isZeroMin(currentDate) {
    return currentDate.getMinutes() == 0;
};
function isZeroSec(currentDate) {
    return currentDate.getSeconds() == 0;
}
function startScheduler() {
    timer = setInterval(function() {
        let currentDate = new Date();
        if(scheduleTime != HALF_DAY) {
            if(isExactNightHours(currentDate) && isZeroMin(currentDate) && isZeroSec(currentDate)) {            
                disableNightMode();
                scheduleTime = HALF_DAY;
                if(isNightHours) {
                    logger.debug("In night hours Scheduler ON" + JSON.stringify(lightModel.data));
                    rpController.light("on", lightModel.data.speed);
                }
                else {
                    logger.debug("In night hours Scheduler OFF" + JSON.stringify(lightModel.data));
                    rpController.light("off", lightModel.data.speed);
                }
                startScheduler();
            }    
        }
        else {
            if(isNightHours) {
                rpController.light("on", lightModel.data.speed);
            }
            else {
                rpController.light("off", lightModel.data.speed);
            }
        }
    }, scheduleTime)
};
function disableNightMode() {
    clearInterval(timer);
    timer = null;    
}
module.exports.enable = function(flag) {
    if(flag) {
        if(isNightHours()) {
            logger.debug("In night hours " + JSON.stringify(lightModel.data));
            rpController.light("on", lightModel.data.speed);
        }
        scheduleTime = ONE_SEC;
        startScheduler();
        return {mode: "night"};
    }
    else {
        disableNightMode();
        return {mode: "default"};
    }
}