/* insertdata.js  */

import { MongoClient } from 'mongodb';

const urlConnect = 'mongodb://localhost:27017';

async function saveData(data: any[]) {
  // substitua pela sua URL de conexão
  const url = urlConnect;
  const client = new MongoClient(url);

  try {
    // conecta ao banco de dados
    await client.connect();

    // seleciona a base de dados e a coleção
    const db = client.db('myDatabase');
    const collection = db.collection('myCollection');

    // insere os dados na coleção
    await collection.insertMany(data);
  } finally {
    // fecha a conexão com o banco de dados
    await client.close();
  }
}