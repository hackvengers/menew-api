const request = require('request');
const fs = require('fs');

const getOcrText = image => {
  const fileStream = fs.createReadStream(
    `${image.destination}${image.filename}`
  );

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
        resolve(JSON.parse(body));
      }
    );
  });
};

module.exports = { getOcrText };
