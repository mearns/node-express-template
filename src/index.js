const express = require("express");
const configureSite = require("./site");

const PORT = 8080;

function main() {
    const app = express();
    app.use("/pages", express.static("./dist/pages"));
    app.use("/static/bundles", express.static("./dist/bundles"));
    configureSite(app);
    app.listen(PORT, error => {
        if (error) {
            console.error(error);
            process.exitCode = 1;
        } else {
            console.log(`Listening on http://localhost:${PORT}...`);
        }
    });
}

main();
