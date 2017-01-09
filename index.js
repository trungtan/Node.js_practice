/**
 * Created by trung on 05-Jan-17.
 */

/**
 * A simple web app at port 80
 * to run: node index
 */

"use strict";

const BookClass = require('./book');

const book = new BookClass();
book.on('rated', () => {
    console.log(`Rated with ${book.getRate()} points.`);
});

book.rate(11);