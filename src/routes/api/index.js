const api = require('express').Router();
const menu = require('./menu');

api.use('/menu', menu);

module.exports = api;
