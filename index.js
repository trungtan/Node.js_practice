/**
 * Created by trung on 05-Jan-17.
 */

/**
 * A simple web app at port 80
 * to run: node index
 */

"use strict";

const http = require('http');
const express = require('express');
const fs = require('fs');

//const configFile = fs.readFileSync('./config.json');

fs.readFile('./config.json', function (err, data) {
    const config = JSON.parse(data);

    const app = express();
    app.use(express.static(config.webServer.dir));

    const httpServer = http.createServer(app);
    httpServer.listen(config.webServer.port, function (err) {
        if (err) {
            console.log(err.message);
            return;
        }
        console.log(`Server is running at port ${config.webServer.port}.`);
    });
});

console.log('Reading config file...');