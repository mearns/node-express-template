const getStuffHandler = require("./api/get-stuff");

module.exports = function configureSite(app) {
    app.use("/api/get-stuff", getStuffHandler);
};
