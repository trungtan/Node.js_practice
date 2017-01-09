/**
 * Created by trung on 05-Jan-17.
 */

/**
 * A simple web app at port 80
 * to run: node index
 */

"use strict";

const http = require('http');
const fs = require('fs');
const express = require('express');
const widgetRouter = require('./routers/widgets');
const bodyParser = require('body-parser');

//const configFile = fs.readFileSync('./config.json');

fs.readFile('./config.json', function (err, data) {
    //1. Init and config the server
    const config = JSON.parse(data);
    const app = express();
    app.use(express.static(config.webServer.dir));
    const httpServer = http.createServer(app);

    //2. Use the Router
    app.use(bodyParser.urlencoded({ extended: false })); //Content-type must be Content-Type: application/x-www-form-urlencoded
    app.use('/api', bodyParser.json()); //bodyParser will setup a new property on the request object called 'body'
    app.use('/api', widgetRouter);

    //3. Listening
    const port = process.env.PORT || config.webServer.port;
    httpServer.listen(port, function (err) {
        if (err) {
            console.log(err.message);
            return;
        }
        console.log(`Server is running at port ${port}.`);
    });
});

console.log('Reading config file...');