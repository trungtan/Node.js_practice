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


/*
const { necessary, second: sec } = require("./my-module");
necessary();
sec();
*/

const myMod1 = require('./my-module');
myMod1.setData('Data by module 1');
myMod1.showData();
const myMod2 = require('./my-module');  //singleton require
myMod2.showData();
console.log(myMod1 === myMod2);