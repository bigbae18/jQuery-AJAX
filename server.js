const argv = require('yargs').usage('Syntaxis: $0 --port [núm] --hostname [IP/Domain/DNS]').argv;
const http = require('http');
const fs = require('fs');
const path = require('path');

const port = argv.port || '3000';
const hostname = argv.hostname || '127.0.0.1';

const bigBae = http.createServer(function (req, res) {

    console.log(`Petición ${req.method} desde ${req.url}`);

    if (req.url === '/') {
        fs.readFile('./src/index.html', 'UTF-8', function (err, html) {
            if (err) {
                console.log(`Error`);
                console.log(err);
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' })
                res.end(html);
            }
        })
    } else if (req.url.match(/.css$/)) {
        const cssPath = path.join(__dirname, '/src/', req.url);
        const fileStream = fs.createReadStream(cssPath, 'UTF-8');
        res.writeHead(200, { 'Content-Type': 'text/css' });
        fileStream.pipe(res);
     } else if (req.url.match(/.js$/)) {
        const jsPath = path.join(__dirname, '/src/', req.url);
        const fileStream = fs.createReadStream(jsPath, 'UTF-8');
        res.writeHead(200, { 'Content-Type': 'text/javascript' });
        fileStream.pipe(res);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Error 404 - Archivo no encontrado');
    }
}).listen(port, hostname, 34, function () {
        console.log(`Escuchando en ${hostname}:${port}`);
});