const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const signUpController = require('./src/controllers/signUpController');
const contatoController = require('./src/controllers/contatoController');

// Rotas da home
route.get('/', homeController.index);

// Rotas de signUp
route.get('/signUp/index', signUpController.index);
route.post('/signUp/register', signUpController.register);

// Rotas de contato
route.get('/contato', contatoController.paginaInicial);

module.exports = route;
