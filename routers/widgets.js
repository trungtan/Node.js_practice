/**
 * Created by tan.bui on 9.1.2017.
 */
const express = require('express');
const widgetRouter = express.Router();

widgetRouter.route('/widgets')
    .get((req, res) => {
            res.json([
                { id: 1, name: 'Bui Tan', email: 'tan@gmail.com', age: 28},
                { id: 2, name: 'Tan Bui', email: 'tanbui@gmail.com', age: 29},
                { id: 3, name: 'Tan Bui', school: 'TUAS', gender: 'male'},
            ]);
        }
    )
    .post();

widgetRouter.route('/widget/:widgetId')
    .get( (req, res) => {
            //Assume a db connection with the ability to select data by ID
            switch (parseInt(req.params.widgetId)) {
                case 1:
                    res.json([
                        { id: 1, name: 'Bui Tan', email: 'tan@gmail.com', age: 28}
                    ]);
                    break;
                case 2:
                    res.json([
                        { id: 2, name: 'Tan Bui', email: 'tanbui@gmail.com', age: 29}
                    ]);
                    break;
                case 3:
                    res.json([
                        { id: 3, name: 'Tan Bui', school: 'TUAS', gender: 'male'}
                    ]);
                    break;
            }
        }

    );

module.exports = widgetRouter;