var express = require("express"), 
    app = express(), 
    port = process.env.PORT || 3000,
    bodyParser = require("body-parser");
let logger = require("./api/logger");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var routes = require("./api/routes/lightRoutes");
routes(app);

app.listen(port);

logger.debug("Home Light rest api listening at " + port);
console.log("Home Light rest api listening at " + port);