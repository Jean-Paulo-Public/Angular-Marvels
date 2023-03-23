/* dataProcessor.js */
const redis = require('redis');
const client = redis.createClient({ socket: { port: 6389 } });

client.connect();

const request = require('request');

// exporta uma função que recebe os dados e retorna os dados tratados
module.exports = async function processData(data) {
  // verifica se os dados possuem a propriedade "data"
  if (data && data.data) {
    // percorre todos os resultados
    for (const result of data.data.results) {
      // verifica se o resultado possui a propriedade "description"
      if (result.description) {
        // remove as tags <br> da descrição
        result.description = result.description.replace(/<br>/g, '');

        // remove #N/A da descrição
        result.description = result.description.replace(/#N\/A/g, '');

        // cria uma chave única para armazenar a tradução em cache
        const cacheKey = `translation:${result.description}`;

        // verifica se a tradução já existe em cache
        const cachedTranslation = await client.get(cacheKey);

        if (cachedTranslation) {
          // usa a tradução em cache
          result.description = cachedTranslation;
        } else {
          // busca a tradução na API do Google Translate
          const translatedText = await translate(result.description);

          // armazena a tradução em cache para uso futuro
          client.set(cacheKey, translatedText);

          result.description = translatedText;
        }
      }
    }
  }

  return data;
};

function translate(text) {
  return new Promise((resolve, reject) => {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=pt&dt=t&q=${encodeURIComponent(text)}`;

    request(url, (error, response, body) => {
      if (error) {
        reject(error);
        return;
      }

      try {
        const data = JSON.parse(body);

        let translatedText = '';

        if (Array.isArray(data[0])) {
          for (const item of data[0]) {
            if (Array.isArray(item)) {
              translatedText += item[0];
            }
          }
        }

        resolve(translatedText);
      } catch (e) {
        reject(e);
      }
    });
  });
}

/* Descrição feita via chat gpt !!! Verifique se está atualizado !!! 
📝 "dataProcessor.js" contém uma função que trata dados antes de retorná-los, usando Redis para armazenar traduções 
    de descrições dos resultados da API.
🔗 A função verifica se a tradução já está em cache e, caso contrário, usa a API do Google Translate para obter a tradução.
📝 A função remove as tags <br> e #N/A das descrições antes da tradução, se necessário, usando expressões regulares.
🔢 A requisição à API do Google Translate é feita de forma assíncrona com a função "Promise".
🚀 "dataProcessor.js" é usado em outros arquivos do projeto para processar dados retornados pela API.
*/