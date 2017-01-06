/**
 * Created by trung on 06-Jan-17.
 * Run this to transpile:
 *      node_modules\.bin\babel src --out-dir dist --presets=es2015
 *
 *  Run this to execute>
 *      node dist/es2015
 */
import { MyTest as Test } from "./MyTest";
import Cal from "./calculator";

var t = new Test();
t.show();

console.log(Cal.plus(12, 13));