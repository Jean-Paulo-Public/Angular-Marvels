// logger.js
const winston = require('winston');

const logger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log' })
  ]
});

module.exports = logger;

/* Descrição feita via chat gpt !!! Verifique se está atualizado !!! 
📝 - Este é um bloco de código Node.js que exporta uma instância do pacote "winston"
📦 - O "winston" é um pacote que provê um logger para aplicações Node.js
🔧 - A instância do logger é configurada para armazenar somente mensagens de erro
💾 - As mensagens de erro são armazenadas em um arquivo chamado "error.log"
📄 - O arquivo "error.log" é um arquivo de texto que contém as mensagens de erro em formato JSON
*/