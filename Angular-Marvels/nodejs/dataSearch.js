// dataSearch.js

const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

module.exports = async function search(type, title, limit, offset) {
  // converte os valores de limit e offset para números inteiros
  limit = parseInt(limit);
  offset = parseInt(offset);

  // verifica se os valores de limit e offset são números inteiros válidos
  if (isNaN(limit) || isNaN(offset)) {
    throw new Error('Os valores de limit e offset devem ser números inteiros válidos');
  }

  try {
    // conecta ao banco de dados MongoDB
    await client.connect();

    // seleciona a base de dados e a coleção correta
    const database = client.db('marvel');
    const collection = database.collection(type);

    // cria uma expressão regular para buscar títulos que correspondam parcial ou totalmente ao título informado
    const titleRegex = new RegExp(title, 'i');

    // busca todos os documentos na coleção que contenham um título que corresponda à expressão regular
    const results = await collection.find({ title: { $regex: titleRegex }, type: type }).limit(limit).skip(offset).toArray();

    // conta o número total de resultados sem aplicar os métodos limit e skip
    const totalResults = await collection.countDocuments({ title: { $regex: titleRegex }, type: type });

    // formata os resultados em um objeto JSON compatível com o retorno da API da Marvel
    const response = {
      data: {
        results: results,
        total: totalResults,
      },
    };

    return response;
  } catch (e) {
    console.error(e);
  }
}