/**
 * Created by tan.bui on 9.1.2017.
 */
const express = require('express');
const widgetRouter = express.Router();

var data = [
    { id: 1, name: 'Bui Tan', email: 'tan@gmail.com', age: 28},
    { id: 2, name: 'Tan Bui', email: 'tanbui@gmail.com', age: 29},
    { id: 3, name: 'Tan Bui', school: 'TUAS', gender: 'male'},
];

widgetRouter.route('/widgets')
    .get((req, res) => {
            res.json(data);
        }
    )
    .post( (req, res) => {
        let insertingItem = req.body;
        data.push(insertingItem);
        res.json([
            {result: 'successful'},
            {inserted_item: insertingItem}
        ])
    });

widgetRouter.route('/widget/:widgetId')
    .get( (req, res) => {
            res.json(data[req.params.widgetId - 1]);
        }
    )
    .delete( (req, res) => {
            let deletingItem = data[req.params.widgetId - 1];
            data.splice(req.params.widgetId - 1, 1);
            res.json([
                {result: 'successful'},
                {deleted_item: deletingItem}
            ])
        }
    );

module.exports = widgetRouter;