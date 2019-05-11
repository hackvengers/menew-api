const request = require('request');
const ocr = require('../../../lib/ocr');
const translate = require('../../../lib/translate');

exports.getMenuText = (req, res) => {
  ocr.getOcrText(req.file).then(result => {
    console.log(result);
  });
};
