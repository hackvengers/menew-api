const api = require('express').Router();
const menu = require('./menu');
const comment = require('./comment');

api.use('/menu', menu);
api.use('/comment', comment);

module.exports = api;
