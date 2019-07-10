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

app.get('/yesterday', (req, res) => {
  axios
    .get('https://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday')
    .then(result => {
      res.send(result.data);
    });
});

app.get('/pastMonth/:curr', (req, res) => {
  const { curr } = req.params;
  axios
    .get(
      `https://api.coindesk.com/v1/bpi/historical/close.json?currency=${curr}`
    )
    .then(result => {
      res.send(result.data);
    });
});

const pad = num => {
  return num < 10 ? '0' + num.toString() : num;
};

app.get('/pastYear/:curr', (req, res) => {
  const { curr } = req.params;
  var dateObj = new Date();
  var month = pad(dateObj.getUTCMonth() + 1);
  var day = pad(dateObj.getUTCDate());
  var year = dateObj.getUTCFullYear();

  let currYear = year + '-' + month + '-' + day;
  let pastYear = year - 1 + '-' + month + '-' + day;

  axios
    .get(
      `https://api.coindesk.com/v1/bpi/historical/close.json?currency=${curr}&start=${pastYear}&end=${currYear}`
    )
    .then(result => {
      res.send(result.data);
    });
});

app.get('/custom/:curr/:start/:end', (req, res) => {
  const { start, end, curr } = req.params;
  axios
    .get(
      `https://api.coindesk.com/v1/bpi/historical/close.json?currency=${curr}&start=${start}&end=${end}`
    )
    .then(result => {
      res.send(result.data);
    })
    .catch(err => {
      console.log(err);
    });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
