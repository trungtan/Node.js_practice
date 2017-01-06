"use strict";

var _es2015_ = require("./es2015_2");

var _calculator = require("./calculator");

var _calculator2 = _interopRequireDefault(_calculator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by trung on 06-Jan-17.
 * Run this to transpile:
 *      node_modules\.bin\babel src --out-dir dist --presets=es2015
 *
 *  Run this to execute>
 *      node dist/es2015
 */
var t = new _es2015_.Test();
t.show();

console.log(_calculator2.default.plus(12, 13));