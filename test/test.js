/**
 * Created by tan.bui on 9.1.2017.
 * Mocha should be install globally for cli call:
 *  npm install -g mocha
 * To run:
 *  mocha test/test.js
 */
"use strict";

var assert = require("assert");

describe('Testing JSON reader', () => {
    it('should get json', (done) => {
        let reader = require('./JSONReader');
        assert.equal(typeof  reader, 'object');
        assert.equal(typeof  reader.read, 'function');
        done();
    });
});