// Create a web server
// Run: node comments.js
// Test: curl -X POST -d "name=John&comment=Hello" http://localhost:3000/comments
//       curl http://localhost:3000/comments
//       curl -X DELETE http://localhost:3000/comments/0
//       curl http://localhost:3000/comments

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var comments = [];

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/comments', function(req, res) {
  var name = req.body.name;
  var comment = req.body.comment;
  comments.push({ name: name, comment: comment });
  res.end('Success');
});

app.get('/comments', function(req, res) {
  res.json(comments);
});

app.delete('/comments/:index', function(req, res) {
  var index = req.params.index;
  comments.splice(index, 1);
  res.end('Success');
});

app.listen(3000);