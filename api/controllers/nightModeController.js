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
                if(isNightHours(currentDate)) {
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
            if(isNightHours(currentDate)) {
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
    let currentDate = new Date();
    if(flag) {
        let result = null;
        if(isNightHours(currentDate)) {            
            result = rpController.light("on", lightModel.data.speed);
            logger.debug("In night hours " + JSON.stringify(lightModel.data));
        }
        else {            
            result = rpController.light("off", lightModel.data.speed);
            logger.debug("In Day hours " + JSON.stringify(lightModel.data));
        }
        scheduleTime = ONE_SEC;
        startScheduler();
        return {status: result.status, mode: "night"};
    }
    else {
        disableNightMode();
        result = rpController.light(lightModel.data.status, lightModel.data.speed);
        return {status: result.status, mode: "default", speed: result.speed};
    }
}