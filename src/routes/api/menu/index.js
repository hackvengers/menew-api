const menu = require('express').Router();
const controller = require('./menu.controller');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

menu.post('/', upload.single('photo'), controller.getOcrBoundingBox);
menu.post('/text', controller.getMenuText);

module.exports = menu;
