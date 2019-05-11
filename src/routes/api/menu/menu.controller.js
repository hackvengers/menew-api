const request = require('request');
const ocr = require('../../../lib/ocr');
const translation = require('../../../lib/translation');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');

const DIR_PATH = path.resolve(__dirname, '../../../uploads');

/*
    POST /api/menu
    form-data {
      photo
    }
*/

exports.getOcrBoundingBox = (req, res) => {
  const upload = multer({
    storage: multer.diskStorage({
      // 저장될 경로와 파일명 지정
      destination: function(req, file, cb) {
        cb(null, DIR_PATH);
      },
      filename: function(req, file, cb) {
        cb(null, new Date().valueOf() + '_' + file.originalname); // 타임스탬프 + 원래 파일명
      }
    }),
    fileFilter: function(req, file, cb) {
      if (checkImage(file)) {
        cb(null, true); // 파일 허용
      } else {
        cb(null, false); // 파일 거부
      }
    }
  }).single('photo'); // req.file은 photo 필드의 파일 정보

  // 이미지인지 확장자와 MIME 타입 체크
  const checkImage = photo => {
    const mimeType = photo.mimetype.split('/');
    const fileType = mimeType[1].toLowerCase();

    return fileType === 'jpg' || fileType === 'jpeg' || fileType === 'png';
  };

  const photoUpload = new Promise((resolve, reject) => {
    // 디렉토리가 존재하지 않으면 생성(mkdir -p)
    if (!fs.existsSync(DIR_PATH)) {
      mkdirp.sync(DIR_PATH);
    }
    upload(req, res, err => {
      if (err) reject(err);
      if (!req.file) reject(new Error('file type error'));
      resolve(req.file.filename);
    });
  });

  photoUpload
    .then(ocr.getOcrText)
    .then(({ imageUrl, result }) => {
      console.log(imageUrl, result);
      res.json({ imageUrl, result });
    })
    .catch(err => {
      res.status(403).json({
        message: err
      });
    });
};

/*
    POST /api/menu/text
    {
      query,
      target
    }
*/

exports.getMenuText = (req, res) => {
  const { query, target } = req.body;
  translation
    .getDetectionLanguage(query)
    .then(langCode => translation.getTranslationText(langCode, target, query))
    .then(result => {
      const { translatedText } = result;
      res.json({ translatedText });
    });
};
