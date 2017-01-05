/**
 * Created by trung on 05-Jan-17.
 */

"use strict";

const http = require('http');
const express = require('express');

const app = express();
app.use(express.static('www'));

const httpServer = http.createServer(app);
httpServer.listen(80, function (err) {
    if (err) {
        console.log(err.message);
        return;
    }
    console.log('Server is running at port 80.');
});