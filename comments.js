// Create web server
// ----------------
// 1. Create a web server that can listen to requests for /hello and respond with some HTML that says <h1>Hello World!</h1>
// 2. Add /hello/NAME, where NAME is any string, to your web server that responds with some HTML that says <h1>Hello NAME!</h1>
// 3. Add /hello?name=NAME, where NAME is any string, to your web server that responds with some HTML that says <h1>Hello NAME!</h1>
// 4. Add /comments to your web server that responds with an unordered list of 2-3 comments (these can be hardcoded comments)
// 5. Add form.html to your web server that submits a POST request to /comments
// 6. Modify /comments so that it accepts POST requests, parses the body for a comment, and adds it to the comment list

var http = require('http');
var url = require('url');
var fs = require('fs');

var server = http.createServer(function(req, res) {
	var path = url.parse(req.url).pathname;
	if (path === '/hello') {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write('<h1>Hello World!</h1>');
		res.end();
	} else if (path.indexOf('/hello/') === 0) {
		var name = path.slice(7);
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write('<h1>Hello ' + name + '!</h1>');
		res.end();
	} else if (path.indexOf('/hello?name=') === 0) {
		var name = path.slice(12);
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write('<h1>Hello ' + name + '!</h1>');
		res.end();
	} else if (path === '/comments') {
		var comments = ['Hello!', 'Hi!', 'Hey!'];
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write('<ul>');
		comments.forEach(function(comment) {
			res.write('<li>' + comment + '</li>');
		});
		res.write('</ul>');
		res.end();
	} else if (path === '/form') {
		fs.readFile('form.html', function(err, data) {
			res.writeHead(200, {'Content-Type':