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
    //1. Init and config
    const config = JSON.parse(data);
    const app = express();
    app.use(express.static(config.webServer.dir));
    const httpServer = http.createServer(app);

    //2. Data, route and process
    app.get('/api/widgets', (req, res) => {
        res.json([
            { name: 'Bui Tan', email: 'tan@gmail.com', age: 28},
            { name: 'Tan Bui', email: 'tanbui@gmail.com', age: 29},
            { name: 'Tan Bui', school: 'TUAS', gender: 'male'},
        ]);
    });

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