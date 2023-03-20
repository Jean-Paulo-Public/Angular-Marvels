/* server.js */

const express = require('express');
const request = require('request');
const { MD5 } = require('crypto-js');
const fs = require('fs');
const app = express();

// importa a função "processData" do módulo "dataProcessor"
const processData = require('./dataProcessor');

const redis = require('redis');
const client = redis.createClient();
client.connect();

// define um tempo de expiração de um dia (em segundos)
const DATA_EXPIRE_CACHE = 60 * 60 *24;

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

  // cria uma chave única para armazenar os dados em cache
  const cacheKey = `marvel:${type}:${limit}:${offset}`;

  // verifica se os dados já estão armazenados em cache
  const cachedData = await client.get(cacheKey);

  if (cachedData) {
    // retorna os dados armazenados em cache
    res.json(JSON.parse(cachedData));
    return;
  }

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
      
      // Coloquei data de expiração de um dia, por que diferentemente de tradução que nunca muda, isso pode mudar uma coisa ou outra, e um dia tá dentro do limite de renovação de consumo da API da marvel.
      client.setEx(cacheKey, DATA_EXPIRE_CACHE, JSON.stringify(data));

      res.json(data);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

/* Descrição feita via chat gpt !!! Verifique se está atualizado !!! 
👨‍💻📡🦸‍♂️ O arquivo "server.js" é um servidor Express que acessa a API da Marvel com autenticação de chaves pública e privada.
🔑 As chaves são lidas de um arquivo secreto JSON e usadas para gerar um hash MD5.
📊 O servidor oferece vários tipos de dados da API da Marvel, incluindo personagens, quadrinhos, eventos, histórias, criadores, favoritos e curtidos.
🚀 O endpoint "/marvel" é a rota principal e pode ser filtrado por tipo, limite e offset.
💾 Os dados são armazenados em cache com um tempo de expiração de um dia para evitar requisições excessivas à API.
👨‍💼 A função "processData" é usada para tratar os dados antes de retorná-los.
❌ O servidor retorna um erro com status 500 se ocorrer um problema durante a requisição ou o processamento dos dados.
🚪 O servidor é iniciado na porta 3000 e uma mensagem é impressa no console para indicar que está ouvindo nessa porta.
*/