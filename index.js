/**
 * Created by trung on 05-Jan-17.
 */

/**
 * SET env var MONGO_URL=mongodb://localhost:27017/nodejs_practice
 * A simple web app at port 80
 * to run: node index
 */

"use strict";

const http = require('http');
const fs = require('fs');
const express = require('express');
//const widgetRouter = require('./routers/widgets');
const accountRouter = require('./routers/accounts');
const bodyParser = require('body-parser');
const passport = require('passport');

const {Strategy, ExtractJwt} = require('passport-jwt');
const jwtOptions = {
    jwtFromRequest : ExtractJwt.fromAuthHeader(),
    secretOrKey : 'mySecretK3y',
    algorithms: ['HS256']
};
passport.use(new Strategy(jwtOptions, (jwtPayload, done) => {
    done(null, {name: jwtPayload.name});
}));

const mongoose = require("mongoose");

//const configFile = fs.readFileSync('./config.json');
fs.readFile('./config.json', function (err, data) {
    //1. Init and config the server
    const config = JSON.parse(data);
    const app = express();
    app.use(express.static(config.webServer.dir));
    const httpServer = http.createServer(app);

    //2. connect mongo db server before calling router
    mongoose.connect(process.env.MONGO_URL || config.mongoServer.uri, function (error) {
        if (error) console.error(error);
        else console.log('Mongo connected');
    });

    //3. Use the Router
    app.use(passport.authenticate('jwt', {session: false}));
    app.use(bodyParser.urlencoded({ extended: false })); //Content-type must be Content-Type: application/x-www-form-urlencoded
    app.use('/api', bodyParser.json()); //bodyParser will setup a new property on the request object called 'body'
    //app.use('/api', widgetRouter);
    app.use('/api', accountRouter);

    //4. Listening
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