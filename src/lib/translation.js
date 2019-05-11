const request = require('request');

const headers = {
  'X-NCP-APIGW-API-KEY-ID': process.env.XNcpApigwApiKeyId,
  'X-NCP-APIGW-API-KEY': process.env.XNcpApigwApiKey
};

// https://apidocs.ncloud.com/ko/ai-naver/papago_language_detection/dect/

const getDetectionLanguage = query => {
  return new Promise((resolve, reject) => {
    request.post(
      {
        url: 'https://naveropenapi.apigw.ntruss.com/langs/v1/dect',
        headers,
        body: {
          query
        },
        json: true
      },
      (err, httpResponse, body) => {
        if (err) {
          reject(err);
        }
        const { langCode } = body;
        resolve(langCode);
      }
    );
  });
};

// https://apidocs.ncloud.com/ko/ai-naver/papago_nmt/translation/

const getTranslationText = (source, target, text) => {
  return new Promise((resolve, reject) => {
    request.post(
      {
        url: 'https://naveropenapi.apigw.ntruss.com/nmt/v1/translation',
        headers,
        body: {
          source,
          target,
          text
        },
        json: true
      },
      (err, httpResponse, body) => {
        if (err) {
          reject(err);
        }
        const {
          message: { result }
        } = body;
        resolve(result);
      }
    );
  });
};

module.exports = { getDetectionLanguage, getTranslationText };
