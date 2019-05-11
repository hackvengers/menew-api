const request = require('request');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const DIR_PATH = path.resolve(__dirname, '../uploads');

const getOcrText = async imageUrl => {
  await sharp(path.resolve(DIR_PATH, imageUrl))
    .resize(360)
    .toFile(path.resolve(DIR_PATH, 'resize', imageUrl));

  const fileStream = fs.createReadStream(
    path.resolve(DIR_PATH, 'resize', imageUrl)
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
          throw err;
          reject(err);
        }
        resolve({ imageUrl, result: JSON.parse(body) });
      }
    );
  });
};

module.exports = { getOcrText };
