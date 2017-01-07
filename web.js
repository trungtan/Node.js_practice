'use strict';

const http = require('http');
const url = require('url');
const zlib = require('zlib');

// demo #1 - including path and file system modules
const fs = require('fs');
const path = require('path');

const defaultFile = 'index.html';
const logFile = 'web.log';
const port = 3000;

// demo #5: rotate log file

// demo #4: append to log file

const server = http.createServer((req, res) => {

	req.originalUrl = req.url;
	req.url = url.parse(req.url, true);
	req.path = req.url.pathname === '/' ? defaultFile : req.url.pathname;

	// demo #2: using path functions to create requested file name
    let dirPath = path.dirname(req.path);
    if (dirPath.endsWith("/")) {
        dirPath = dirPath.slice(0, dirPath.length - 1);
    }
    const fileName = path.format({
        dir: path.join(__dirname, 'www', dirPath),
        base: path.basename(req.path)
    });
    console.log(fileName);

	const processBody = new Promise(resolve => {

		resolve();

		// demo #6: process request body data

	});

	const processFile = new Promise(resolve => {

		resolve();

		res.writeHead(200);
		res.end('Hello World!');

		// demo #3: read request file

		// demo #7: compressing response

	});

	processBody.then(() => processFile);

});

server.listen(port, err => console.log(err || `web server started on port ${port}`));