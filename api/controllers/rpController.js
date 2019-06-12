"use strict";
var Gpio = require('onoff').Gpio;
var blueLight = new Gpio(25, 'out'), whiteLight = new Gpio(21, 'out');
let blinkInterval = null;
let speedMap = {1: "1000", 2: "800", 3: "600", 4: "400", 5: "200"};
let logger = require("../logger");

function clearBlink() {
    if(blinkInterval) {
        clearInterval(blinkInterval);
        blinkInterval = null;
    }
}

module.exports.light = function(status, speed) {
    clearBlink();
    var sp = (speed == null)? 0 : speed;
    if(status === "on") {
        blueLight.writeSync(1);    //LED ON
        whiteLight.writeSync(1);        
        let interval = changeSpeed(sp);
        return {status: "on", interval: interval, speed: sp};
    }        
    else {
        blueLight.writeSync(0);    //LED OFF
        whiteLight.writeSync(0);
        return {status: "off", speed: sp};
    }
}

function changeSpeed(speed) {    
    if(!speed || !speedMap[speed]) {
        blueLight.writeSync(1);    //LED ON
        whiteLight.writeSync(1);
        return null;
    }
    return blink(speedMap[speed]);
}

function blink(interval) {    
    logger.debug("Going to blink with interval " + interval);
    blinkInterval = setInterval(function() {        
        blueLight.writeSync(blueLight.readSync() ^ 1);
        whiteLight.writeSync(whiteLight.readSync() ^ 1);
    }, interval);
    return interval;
}

// scp /Users/Jeyabalaji/Dev/RaspberryPi/Projects/HomeLight1.zip pi@192.168.1.230:/home/pi


