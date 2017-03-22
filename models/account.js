/**
 * Created by tan on 3/22/2017.
 */

let mongoose = require("mongoose");

let accountSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    createdAt: {type: Date, default: Date.now()},
    bio: String,
});

let Account = mongoose.model("Account", accountSchema);
module.exports = Account;