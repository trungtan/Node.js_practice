/**
 * Created by tan.bui on 9.1.2017.
 */
const express = require('express');
const widgetRouter = express.Router();

var data = [
    { id: 0, name: 'Bui Tan', email: 'tan@gmail.com', age: 28},
    { id: 1, name: 'Tan Bui', email: 'tanbui@gmail.com', age: 29},
    { id: 2, name: 'Tan Bui', school: 'TUAS', gender: 'male'},
];

widgetRouter.route('/widgets')
    //GET /api/widgets HTTP/1.1
    .get((req, res) => {
            res.json(data);
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
        let insertingItem = req.body;
        data.push(insertingItem);
        res.json([
            {result: 'successful'},
            {inserted_item: insertingItem}
        ])
    });

widgetRouter.route('/widget/:widgetId')
    //GET /api/widget/2 HTTP/1.1
    .get( (req, res) => {
            res.json(data[req.params.widgetId]);
        }
    )
    //DELETE /api/widget/2
    .delete( (req, res) => {
            let deletingItem = data[req.params.widgetId];
            data.splice(req.params.widgetId, 1);
            res.json([
                {result: 'successful'},
                {deleted_item: deletingItem}
            ])
        }
    )

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