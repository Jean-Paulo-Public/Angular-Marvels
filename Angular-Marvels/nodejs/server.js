/* server.js  */

const express = require('express');
const request = require('request');
const { MD5 } = require('crypto-js');
const fs = require('fs');
const app = express();

app.get('/marvel', (req, res) => {
  const secrets = JSON.parse(fs.readFileSync('./secret.json', 'utf-8'));
  const timestamp = Date.now();
  const privateKey = secrets.privateKey;
  const publicKey = secrets.publicKey;

  const preHash = timestamp + privateKey + publicKey;
  const hash = MD5(preHash).toString();

  const url = `https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;

  request(url).pipe(res);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});