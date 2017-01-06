/**
 * Created by trung on 05-Jan-17.
 */

/**
 * A simple web app at port 80
 * to run: node index
 */

"use strict";
/*const myMod = require('./my-module');

const configA = myMod({
    logPrefix: 'Config A: '
});
configA.log("This is my log content.");

const configB = myMod({
    logPrefix: 'Config B: '
});
configB.log("This is my second log content.");*/


const { necessary } = require("./my-module");
necessary();