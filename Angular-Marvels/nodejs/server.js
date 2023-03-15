/* server.js */

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

  // lê o parâmetro "type" da requisição
  const type = req.query.type || 'favorites';

  // verifica se o valor do parâmetro "type" é igual a "favorites"
  if (type === 'favorites') {
    // retorna uma resposta vazia
    res.json([]);
    return;
  }

  // usa o valor do parâmetro "type" para construir a URL da API da Marvel
  const url = `https://gateway.marvel.com/v1/public/${type}?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;

  request(url).pipe(res);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});