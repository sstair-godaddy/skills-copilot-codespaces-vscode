// Create a web server
// 1) create a web server
// 2) listen on a port
// 3) handle requests
// 4) return a response
const http = require('http');
const fs = require('fs');
const url = require('url');
const port = process.env.PORT || 3000;

function renderHTML(path, res) {
    fs.readFile(path, null, function (error, data) {
        if (error) {
            res.writeHead(404);
            res.write('File not found');
        } else {
            res.write(data);
        }
        res.end();
    });
}

function renderCommentsList(comments, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(comments));
    res.end();
}

function renderComment(comment, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(comment));
    res.end();
}

function addComment(comment, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(comment));
    res.end();
}

const server = http.createServer(function (req, res) {
    const path = url.parse(req.url).pathname;
    switch (req.method) {
        case 'GET':
            if (path === '/comments') {
                renderCommentsList(comments, res);
            } else if (path === '/') {
                renderHTML('./index.html', res);
            } else if (path === '/create') {
                renderHTML('./create.html', res);
            } else if (path === '/comment') {
                renderComment(comment, res);
            } else {
                renderHTML('./404.html', res);
            }
            break;
        case 'POST':
            if (path === '/comment') {
                addComment(comment, res);
            }
            break;
        default:
            renderHTML('./404.html', res);
            break;
    }
});

server.listen(port);
console.log('Server running at http://localhost:' + port + '/');
