const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../client/dist')));

const axios = require('axios');

app.get('/currentPrice', (req, res) => {
  axios
    .get('https://api.coindesk.com/v1/bpi/currentprice.json')
    .then(result => {
      res.send(result.data);
    });
});

app.get('/daily', (req, res) => {
  axios
    .get('https://api.coindesk.com/v1/bpi/historical/close.json?index=[USD]')
    .then(result => {
      res.send(result.data);
    });
});

app.get('/yesterday', (req, res) => {
  axios
    .get('https://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday')
    .then(result => {
      res.send(result.data);
    });
});

app.get('/yearly', (req, res) => {
  axios
    .get(
      'https://api.coindesk.com/v1/bpi/historical/close.json?start=2018-07-10&end=2019-07-10'
    )
    .then(result => {
      res.send(result.data);
    });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
