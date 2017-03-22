/**
 * Created by tan.bui on 9.1.2017.
 * After enabling JWT authentication, the REST client must add the authorization to header
 *  https://jwt.io/
 *
 GET /api/accounts HTTP/1.1
 Host: localhost:8080
 Authorization: JWT  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlRhbiBCdWkiLCJhZG1pbiI6ZmFsc2V9.GT5JbFEM7DFN9u2-FOb8KffFm4ojXq4eXyq0urPcSWU
 Cache-Control: no-cache
 Postman-Token: 7ab0d956-cda0-6a0a-d0cb-e908661fc5a6
 */
const express = require('express');
const accountRouter = express.Router();
const Account = require('../models/account');

Account.collection.deleteMany();
Account.collection.insertMany([
    {
        username: "Tan Bui",
        password: "testing password"
    },
    {
        username: "Bui Tan",
        password: "password"
    }
]);

accountRouter.route('/accounts')
    //GET /api/accounts HTTP/1.1
    .get((req, res) => {
            account.getAll(res);
        }
    )
    /**
     * POST /api/accounts HTTP/1.1
     Host: localhost:8080
     Content-Type: application/x-www-form-urlencoded
     Cache-Control: no-cache
     id=10&name=From+Client&age=Brand+new
     */
     .post( (req, res) => {              //Content-type must be Content-Type: application/x-www-form-urlencoded
        let insertingItem = req.body;   //req.body is an object
        account.insertOne(insertingItem);
        res.json([
            {result: 'successful'},
            {inserted_item: insertingItem}
        ])
    });

accountRouter.route('/accounts/:accountId')
    //GET /api/accounts/2 HTTP/1.1
    .get( (req, res) => {
            account.getOne(res, parseInt(req.params.accountId));     //make sure that "id" is correct data type
        }
    )
    //DELETE /api/account/2
    .delete( (req, res) => {
        account.deleteOne(res, parseInt(req.params.accountId))
    })

    /**
     PUT /api/accounts/2 HTTP/1.1
     Host: localhost:8080
     Content-Type: application/x-www-form-urlencoded
     Cache-Control: no-cache

     name=edit+From+Client&age=Edit+Brand+new&newProp=Value+new+prop
     */
    .put( (req, res) => {
        let updatingObj = JSON.parse(JSON.stringify(req.body));
        updatingObj.id = parseInt(req.params.accountId);
        account.updateOne(res, updatingObj);
    });

module.exports = accountRouter;