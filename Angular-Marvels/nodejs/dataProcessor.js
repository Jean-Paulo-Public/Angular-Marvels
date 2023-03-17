// dataProcessor.js

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

        console.log('Original description:', result.description);

        // traduz a descrição para o português usando a API do Google Translate
        result.description = await translate(result.description);

        console.log('Translated description:', result.description);
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
        console.log(body);
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