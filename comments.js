// Create web server
// Run the following command: node comments.js
// Load http://localhost:3000 in your web browser

// Load the http module to create an http server.
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

var comments = [];

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  var path = url.parse(request.url).pathname;
  if (path === '/comment') {
    switch (request.method) {
      case 'POST':
        var body = '';
        request.on('data', function (data) {
          body += data;
        });
        request.on('end', function () {
          var comment = qs.parse(body).comment;
          comments.push(comment);
          response.writeHead(200, {'Content-Type': 'text/plain'});
          response.end('Comment added\n');
        });
        break;
      case 'GET':
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end(comments.join('\n') + '\n');
        break;
      default:
        response.writeHead(405, {'Content-Type': 'text/plain'});
        response.end('Method not allowed\n');
        break;
    }
  } else {
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.end('Not found\n');
  }
});

// Listen on port 3000, IP defaults to