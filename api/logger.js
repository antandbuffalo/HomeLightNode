const log4js = require("log4js");
log4js.configure({
    appenders: { homelight: { type: 'file', filename: 'home_light.log' } },
    categories: { default: { appenders: ['homelight'], level: 'debug' } }
});
let logger = log4js.getLogger("homelight");

module.exports = logger;