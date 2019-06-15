var rpController = require("./rpController");
var lightStatus = require("./../models/lightModel"); 
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
                    rpController.light("on", lightStatus.data.speed);
                }
                else {
                    rpController.light("off", lightStatus.data.speed);
                }
                startScheduler();
            }    
        }
        else {
            if(isNightHours) {
                rpController.light("on", lightStatus.data.speed);
            }
            else {
                rpController.light("off", lightStatus.data.speed);
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
            rpController.light("on", lightStatus.data.speed);
        }
        scheduleTime = ONE_SEC;
        startScheduler();
        lightStatus.data.isNightMode = true;
    }
    else {
        disableNightMode();
        lightStatus.data.isNightMode = false;
    }
}