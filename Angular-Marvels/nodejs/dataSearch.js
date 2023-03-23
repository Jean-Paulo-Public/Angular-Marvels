// dataSearch.js

const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

module.exports = async function search(type, title) {
  try {
    // conecta ao banco de dados MongoDB
    await client.connect();

    // seleciona a base de dados e a coleção correta
    const database = client.db('marvel');
    const collection = database.collection(type);

    // cria uma expressão regular para buscar títulos que correspondam parcial ou totalmente ao título informado
    const titleRegex = new RegExp(title, 'i');

    // busca todos os documentos na coleção que contenham um título que corresponda à expressão regular
    const results = await collection.find({ title: { $regex: titleRegex }, type: type }).toArray();

    // formata os resultados em um objeto JSON compatível com o retorno da API da Marvel
    const response = {
      data: {
        results: results,
        total: results.length,
      },
    };

    return response;
  } catch (e) {
    console.error(e);
  }
}