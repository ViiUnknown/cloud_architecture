const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/test', (req, res) => {
  res.send('Hello World!');
});

app.put('/test', (req, res) => {
  res.send('Hello World!');
});
app.delete('/test', (req, res) => {
  res.send('Hello World!');
});
app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});


module.exports = app;
