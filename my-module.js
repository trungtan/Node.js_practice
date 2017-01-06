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