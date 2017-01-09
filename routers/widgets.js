/**
 * Created by tan.bui on 9.1.2017.
 */
const express = require('express');
const widgetRouter = express.Router();

widgetRouter.route('/widgets')
    .get((req, res) => {
            res.json([
                { name: 'Bui Tan', email: 'tan@gmail.com', age: 28},
                { name: 'Tan Bui', email: 'tanbui@gmail.com', age: 29},
                { name: 'Tan Bui', school: 'TUAS', gender: 'male'},
            ]);
        }
    )
    .post();

module.exports = widgetRouter;