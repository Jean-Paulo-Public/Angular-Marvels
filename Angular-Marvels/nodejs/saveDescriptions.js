const { MongoClient } = require('mongodb');
const logger = require('./logger');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function saveDescriptions(type, data) {
  try {
    await client.connect();
    const database = client.db('marvel');
    const collection = database.collection(type);

    const operations = data.data.results
      .filter(result => result.description)
      .map(result => ({
        updateOne: {
          filter: { id: result.id },
          update: { $set: { description: result.description } },
          upsert: true,
        },
      }));

    if (operations.length > 0) {
      await collection.bulkWrite(operations);
    }
  } catch (e) {
    logger.error(e);
  }
}

module.exports = saveDescriptions;

/* Descrição feita via chat gpt !!! Verifique se está atualizado !!! 
📝 - Ela é uma função assíncrona
💾 - que salva as descrições
🔍 - dos resultados da API da Marvel
💽 - no banco de dados MongoDB.
📚 - A descrição é salva na coleção correspondente ao tipo (personagem, histórias, etc.) especificado.
❗️ - Se ocorrer um erro durante a execução, ele é registrado no logger.
*/