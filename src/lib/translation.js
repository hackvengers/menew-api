const request = require('request');

const headers = {
  'X-NCP-APIGW-API-KEY-ID': process.env.X_NCP_APIGW_API_KEY_ID,
  'X-NCP-APIGW-API-KEY': process.env.X_NCP_APIGW_API_KEY
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
        if (!body.message || !body.message.result) return;
        const {
          message: { result }
        } = body;
        resolve(result);
      }
    );
  });
};

module.exports = { getDetectionLanguage, getTranslationText };
