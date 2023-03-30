// dataProcessor.ts
import request from 'request';
export async function processData(data) {
    if (data && data.data) {
        for (const result of data.data.results) {
            if (result.description) {
                result.description = result.description.replace(/<br>/g, '');
                result.description = result.description.replace(/#N\/A/g, '');
                result.description = await translate(result.description);
            }
        }
    }
    return data;
}
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
            }
            catch (e) {
                reject(e);
            }
        });
    });
}
//# sourceMappingURL=dataProcessor.js.map