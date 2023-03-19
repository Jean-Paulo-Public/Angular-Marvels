// dataProcessor.js
const redis = require('redis');
const { promisify } = require('util');

const client = redis.createClient('redis://localhost:6389');

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

        if (!client.connect){
          client.connect();
        }
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
Esse é um módulo chamado "dataProcessor" que exporta uma função assíncrona chamada "processData".
A função recebe um objeto de dados como parâmetro e retorna uma versão modificada dos dados.
A função faz várias verificações e modificações no objeto de dados. 
Primeiro, ela verifica se a propriedade "data" existe no objeto de dados e percorre todos os resultados nessa propriedade. 
Em cada resultado, a função verifica se a propriedade "description" existe e remove as tags HTML <br> e a string "#N/A" 
da descrição.
Em seguida, a função verifica se há uma tradução armazenada em cache para a descrição em questão. 
Se houver, a função usa a tradução em cache para a descrição e se não houver, ela faz uma solicitação para a 
API do Google Translate para traduzir a descrição de inglês para português. 
A tradução resultante é armazenada em cache e usada no resultado atual.
A função de tradução é definida internamente e usa o pacote "request" para fazer uma solicitação à API do Google Translate.
O resultado é tratado em JSON e a tradução é extraída e retornada em uma Promise resolvida.
O módulo "dataProcessor" também usa o pacote "redis" para armazenar as traduções em cache. 
A conexão com o servidor Redis é estabelecida ao iniciar o módulo e a biblioteca "promisify" é usada para transformar as 
funções assíncronas do pacote "redis" em funções que retornam Promises.
*/