/* server.js */

const express = require('express');
const request = require('request');
const { MD5 } = require('crypto-js');
const fs = require('fs');
const app = express();

// importa a função "processData" do módulo "dataProcessor"
const processData = require('./dataProcessor');

app.get('/marvel', async (req, res) => {
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

  // lê o parâmetro "limit" da requisição e define um valor padrão de 5 caso não seja informado
  const limit = req.query.limit || 5;

  // lê parametro "offset" da requisição
  const offset = req.query.offset || 0;

  // usa os valores dos parâmetros "type" e "limit" para construir a URL da API da Marvel
  const url = `https://gateway.marvel.com/v1/public/${type}?ts=${timestamp}&apikey=${publicKey}&hash=${hash}&limit=${limit}&offset=${offset}`;

  request(url, async (error, response, body) => {
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }

    try {
      // converte a resposta em JSON
      let data = JSON.parse(body);

      // trata os dados usando a função "processData"
      data = await processData(data);

      res.json(data);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});