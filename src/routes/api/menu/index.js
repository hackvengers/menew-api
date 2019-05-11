const menu = require('express').Router();
const controller = require('./menu.controller');

menu.post('/', controller.getOcrBoundingBox);
menu.post('/text', controller.getMenuText);

module.exports = menu;
