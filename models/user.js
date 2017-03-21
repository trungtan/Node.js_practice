/**
 * Created by tan on 3/21/2017.
 * http://mongodb.github.io/node-mongodb-native/2.0/api/Collection.html?_ga=1.236825473.1848870889.1488224984#insertMany
 */
"use strict";

const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const url = 'mongodb://localhost:27017/nodejs_practice';

function insertMockDocuments() {
    MongoClient.connect(url, (err, db) => {
        db.collection("users", (err, col) => {
            col.insertMany([
                { id: 0, name: 'Bui Tan', email: 'tan@gmail.com', age: 28},
                { id: 1, name: 'Tan Bui', email: 'tanbui@gmail.com', age: 29},
                { id: 2, name: 'Tan Bui', school: 'TUAS', gender: 'male'},
            ], (err, r) => {
                assert.equal(null, err);
                assert.equal(3, r.insertedCount)
            });
        });
        db.close();
    });
}



module.exports = {
    insertMockDocuments
};