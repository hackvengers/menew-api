const request = require('request');
const fs = require('fs');
const path = require('path');

const DIR_PATH = path.resolve(__dirname, '../uploads');

const getOcrText = imageUrl => {
  const fileStream = fs.createReadStream(path.resolve(DIR_PATH, imageUrl));

  return new Promise((resolve, reject) => {
    request.post(
      {
        url: 'https://koreacentral.api.cognitive.microsoft.com/vision/v1.0/ocr',
        formData: {
          file: fileStream
        },
        headers: {
          'Ocp-Apim-Subscription-Key': process.env.OcpApimSubscriptionKey
        }
      },
      (err, httpResponse, body) => {
        if (err) {
          reject(err);
        }
        resolve({ imageUrl, result: JSON.parse(body) });
      }
    );
  });
};

module.exports = { getOcrText };
