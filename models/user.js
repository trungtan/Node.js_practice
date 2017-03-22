/**
 * Created by tan on 3/21/2017.
 * http://mongodb.github.io/node-mongodb-native/2.2/
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
                { id: 2, name: 'Tan Bui', school: 'TUAS', gender: 'male', age: 27},
            ]);
        });

        db.close();
    });
}

function insertOne(user) {
    MongoClient.connect(url, (err, db) => {
        db.collection("users", (err, col) => {
            col.insertOne(user, (err, r) => {
                assert.equal(null, err);
                console.log("Inserted a user.");
            });
        });
        db.close();
    });
}

function getAll(res) {
    MongoClient.connect(url, (err, db) => {
        db.collection("users", (err, col) => {
            col.find().toArray( (err, items) => {
                res.json(items);
            });
        });
        db.close();
    });
}

function getOne(res, id) {      //make sure that "id" is correct data type
    MongoClient.connect(url, (err, db) => {
        db.collection("users", (err, col) => {
            col.find({"id": id}).toArray( (err, items) => {
                res.json(items);
            });
        });
        db.close();
    });
}

function deleteOne(res, id) {
    MongoClient.connect(url, (err, db) => {
        db.collection("users", (err, col) => {
            col.deleteOne({"id": id}, (err, r) => { //deleteMany
                assert.equal(null, err);
                res.json({
                    result: 'successful',
                    operation: 'delete',
                    count: r.deletedCount
                })
            })
        });
        db.close();
    });
}

function updateOne(res, obj) {
    MongoClient.connect(url, (err, db) => {
        db.collection("users", (err, col) => {
            col.findOneAndUpdate({"id": obj.id},
                {$set: {
                    name: obj.name,
                    school: obj.school,
                    age: obj.age
                }}, {
                    returnOriginal: false   //return the updated doc
                    , upsert: true
                }, function(err, r) {
                    assert.equal(null, err);
                    res.json({
                        result: 'successful',
                        operation: 'update',
                        data: r.value
                    })
                });
        });
        db.close();
    });
}

module.exports = {
    insertMockDocuments, insertOne, getAll, getOne, deleteOne, updateOne
};