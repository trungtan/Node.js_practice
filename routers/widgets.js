/**
 * Created by tan.bui on 9.1.2017.
 * After enabling JWT authentication, the REST client must add the authorization to header
 *  https://jwt.io/
 *
 GET /api/widgets HTTP/1.1
 Host: localhost:8080
 Authorization: JWT  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlRhbiBCdWkiLCJhZG1pbiI6ZmFsc2V9.GT5JbFEM7DFN9u2-FOb8KffFm4ojXq4eXyq0urPcSWU
 Cache-Control: no-cache
 Postman-Token: 7ab0d956-cda0-6a0a-d0cb-e908661fc5a6
 */
const express = require('express');
const widgetRouter = express.Router();
const User = require('../models/user');

User.insertMockDocuments();

widgetRouter.route('/widgets')
    //GET /api/widgets HTTP/1.1
    .get((req, res) => {
            User.getAll(res);
        }
    )
    /**
     * POST /api/widgets HTTP/1.1
     Host: localhost:8080
     Content-Type: application/x-www-form-urlencoded
     Cache-Control: no-cache
     id=10&name=From+Client&age=Brand+new
     */
     .post( (req, res) => {              //Content-type must be Content-Type: application/x-www-form-urlencoded
        let insertingItem = req.body;   //req.body is an object
        User.insertOne(insertingItem);
        res.json([
            {result: 'successful'},
            {inserted_item: insertingItem}
        ])
    });

widgetRouter.route('/widgets/:widgetId')
    //GET /api/widgets/2 HTTP/1.1
    .get( (req, res) => {
            User.getOne(res, parseInt(req.params.widgetId));     //make sure that "id" is correct data type
        }
    )
    //DELETE /api/widget/2
    .delete( (req, res) => {
        User.deleteOne(res, parseInt(req.params.widgetId))
    })

    /**
     PUT /api/widget/2 HTTP/1.1
     Host: localhost:8080
     Content-Type: application/x-www-form-urlencoded
     Cache-Control: no-cache

     name=edit+From+Client&age=Edit+Brand+new&newProp=Value+new+prop
     */
    .put( (req, res) => {
        let updatingObj = JSON.parse(JSON.stringify(req.body));
        updatingObj.id = req.params.widgetId;

        data.splice(updatingObj.id, 1);
        data.push(updatingObj);

        res.json([
            {result: 'successful'},
            {updated_item: updatingObj}
        ])
    });

module.exports = widgetRouter;