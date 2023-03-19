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

/* Descrição feita via chat gpt !!! Verifique se está atualizado !!! 
Esse código é um exemplo de um servidor backend usando o framework Express.js para servir uma API que se comunica com a 
API pública da Marvel. A API pública da Marvel é usada para buscar informações sobre personagens, quadrinhos, eventos, etc. 
O código também faz uso da biblioteca request para fazer requisições HTTP para a API da Marvel e da biblioteca crypto-js 
para gerar um hash MD5.

A API tem um endpoint "/marvel" que aceita parâmetros de consulta opcionais, incluindo "type", "limit" e "offset". 
O parâmetro "type" é usado para especificar o tipo de recurso que será recuperado da API da Marvel, como personagens, 
quadrinhos, eventos, etc. O parâmetro "limit" é usado para limitar o número de resultados retornados e o parâmetro "offset" 
é usado para especificar a posição inicial dos resultados retornados.

O código lê um arquivo chamado "secret.json" para obter as chaves pública e privada necessárias para acessar a API pública 
da Marvel. Ele também usa a função "processData" de um módulo "dataProcessor" para processar os dados retornados pela API 
da Marvel antes de retornar a resposta para o cliente.

Se o valor do parâmetro "type" for igual a "favorites", o servidor retornará uma resposta vazia em JSON. [*** por enquanto]
Se ocorrer um erro ao fazer a requisição para a API da Marvel, o servidor retornará um objeto JSON com uma mensagem de erro. 
O servidor está configurado para ouvir na porta 3000. */