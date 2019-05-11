const request = require('request');
const ocr = require('../../../lib/ocr');
const translation = require('../../../lib/translation');

/*
    POST /api/menu
    form-data {
      photo
    }
*/

exports.getOcrBoundingBox = (req, res) => {
  ocr.getOcrText(req.file).then(result => {
    console.log(result);
    res.json(result);
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
      const { regions } = result;
      res.json(regions);
    });
};
