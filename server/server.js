var express = require('express');
var app = express();
var models = require('./models.js');

app.use(express.json());
app.use(express.urlencoded( {extended: true} ));

app.get('/test', (req, res) => {
  res.send({getTest: 'passed'});
})

app.post('/test', (req, res) => {
  res.send({postTest: 'passed'});
})

app.get('/products', (req, res) => {
  models.products.get((err, results) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200).send(results);
    }
  })
})

app.get('/products/:id', (req, res) => {
  models.productInfo.get(req.params.id, (err, results) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200).send(results);
    }
  })
})

app.get('/products/:id/styles', (req, res) => {
  models.productStyles.get(req.params.id, (err, results) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200).send(results);
    }
  })
})

app.get('/products/:id/related', (req, res) => {
  models.productsRelated.get(req.params.id, (err, results) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200).send(results);
    }
  })
})



var port = 8080;
app.listen(port, () => {
  console.log('Listening on port: ', port);
});

module.exports = app;