/**
 * Created by tan.bui on 9.1.2017.
 * https://www.sitepoint.com/nodejs-events-and-eventemitter/
 */
"use strict";

const util = require('util');
const events = require('events');

function BookClass() {
    this.ratePoint = 0;

    this.rate = (points) => {
        this.ratePoint = points;
        this.emit('rated');
    };

    this.getRate = () => {
        return this.ratePoint;
    }
}

util.inherits(BookClass, events.EventEmitter);  //set BookClass to be a child of EventEmitter

module.exports = BookClass;