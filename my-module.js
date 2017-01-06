/**
 * Created by trung on 06-Jan-17.
 */

module.exports = function(config) {
    return {
        log: function (msg) {
            console.log(config.logPrefix + msg);
        }
    }
};

module.exports = {
    necessary: function () {
        console.log("This is your necessary module.")
    },
    second: function () {
        console.log("This is your second necessary module.")
    },
    unnecessary: function () {
        console.log("Don't need to import this.")
    }
};