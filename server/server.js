var express = require('express');
var app = express();

app.get('/test', (req, res) => {
  res.send({getTest: 'passed'});
})

app.post('/test', (req, res) => {
  res.send({postTest: 'passed'});
})



var port = 3000;
app.listen(port, () => {
  console.log('Listening on port: ', port);
});

module.exports = app;