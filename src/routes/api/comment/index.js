const comment = require('express').Router();
const controller = require('./comment.controller');

comment.post('/', controller.writeComment);
comment.post('/list', controller.listComment);

module.exports = comment;
