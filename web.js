'use strict';

const http = require('http');
const url = require('url');
const zlib = require('zlib');

// demo #1 - including path and file system modules
const fs = require('fs');
const path = require('path');

const defaultFile = 'index.html';
var logFile = `logs${path.sep}web.log`;
const port = 3000;

// demo #5: rotate log file
try {
    fs.statSync(logFile);
    const {dir: dirName, name: fileName, ext: fileExt} = path.parse(logFile);

    let i = 0;
    let nextFileName;

    try {
        do {
            nextFileName = `${dirName}${path.sep}${fileName}_${++i}${fileExt}`;
        } while (fs.statSync(nextFileName));
    }catch(err) {
        fs.renameSync(logFile, nextFileName);
        console.log(`Log file name changed from ${logFile} to ${nextFileName}`);
        logFile = nextFileName;
    }
} catch (err) {
    console.log(`Log file ${logFile} not found.`);
}

// demo #4: append to log file
const log = function (entry) {
    fs.appendFile(logFile, `${entry}\n`, 'utf8');
};
const error = entry => log(`Error: ${entry}`);  //ES6 syntax
const info = entry => log(`Info: ${entry}`);

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

	const processBody = new Promise(resolve => {
		// demo #6: process request body data
        if (req.method === 'POST') {
            const reqBuffers = [];
            req.on('data', chunk => reqBuffers.push(new Buffer(chunk)));
            req.on('end', () => {
                console.log(Buffer.concat(reqBuffers).toString('utf8'));
                resolve();
            });
        } else {
            resolve();
        }
	});

	const processFile = new Promise(resolve => {

		// demo #3: read request file
        fs.readFile(fileName, 'utf8', (err, data) => {
            if (err) {
                error(err);
                res.writeHead(404);
                res.end('File not found!');
                return;
            }
            info(`${req.method} - ${req.originalUrl}`);
            res.writeHead(200);
            res.end(data);
        });

        resolve();

		// demo #7: compressing response

	});

	processBody.then(() => processFile);

});

server.listen(port, err => console.log(err || `web server started on port ${port}`));