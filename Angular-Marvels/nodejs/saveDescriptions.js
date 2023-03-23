const { MongoClient } = require('mongodb');
const logger = require('./logger');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function saveDescriptions(type, data) {
  try {
    // Conecta ao mongo db
    await client.connect();
    // A base de dados local no mongo se chama "marvel"
    const database = client.db('marvel');
    // a collection [análogo a tabela] será o tipo, como personagens, etc...
    const collection = database.collection(type);

    const operations = data.data.results
    // Somente os que tem descrição ou título
    .filter(result => result.description || result.name)
    // Para cada registro em result
    .map(result => ({
      // Modifique(atualiza/insere) um documento [analogo a um registro]
      updateOne: {
        // filtro de atualização 
        filter: { id: result.id },
        // Atualização a ser feita
        update: { $set: { description: result.description,
                          title: result.name } },
        // Dá insert caso registro não exista
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