const request = require('request');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const mkdirp = require('mkdirp');

const DIR_PATH = path.resolve(__dirname, '../uploads');
const RESIZE_DIR_PATH = path.join(DIR_PATH, 'resize');

const getOcrText = async imageUrl => {
  // 디렉토리가 존재하지 않으면 생성(mkdir -p)
  if (!fs.existsSync(RESIZE_DIR_PATH)) {
    mkdirp.sync(RESIZE_DIR_PATH);
  }

  await sharp(path.resolve(DIR_PATH, imageUrl))
    .resize(800)
    .withMetadata()
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
          console.log(err);
          throw err;
          reject(err);
        }
        resolve({ imageUrl, result: JSON.parse(body) });
      }
    );
  });
};

module.exports = { getOcrText };
