/* server.ts */
import express from 'express';
import request from 'request';
import { MD5 } from 'crypto-js';
import * as fs from 'fs';
import { processData } from './dataProcessor';
const app = express();
app.get('/marvel', async (req, res) => {
    const secrets = JSON.parse(fs.readFileSync('./secret.json', 'utf-8'));
    const timestamp = Date.now();
    const privateKey = secrets.privateKey;
    const publicKey = secrets.publicKey;
    const preHash = timestamp + privateKey + publicKey;
    const hash = MD5(preHash).toString();
    // lê o parâmetro "type" da requisição
    const type = typeof req.query['type'] === 'string' ? req.query['type'] : 'favorites';
    // verifica se o valor do parâmetro "type" é igual a "favorites"
    if (type === 'favorites') {
        // retorna uma resposta vazia
        res.json([]);
        return;
    }
    const limit = typeof req.query['limit'] === 'string' ? parseInt(req.query['limit']) : 5;
    const offset = typeof req.query['offset'] === 'string' ? parseInt(req.query['offset']) : 0;
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
        }
        catch (e) {
            const error = e;
            res.status(500).json({ error: error.message });
        }
    });
});
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
//# sourceMappingURL=server.js.map