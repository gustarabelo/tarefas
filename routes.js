const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const signUpController = require('./src/controllers/signUpController');
const signInController = require('./src/controllers/signInController');
const contatoController = require('./src/controllers/contatoController');

// Rotas da home
route.get('/', homeController.index);

// Rotas de signUp
route.get('/signUp/index', signUpController.index);
route.post('/signUp/register', signUpController.register);

//Rotas de signIn
route.get('/signIn/index', signInController.index);
route.post('/signIn/register', signInController.login);

// Rotas de contato
route.get('/contato', contatoController.paginaInicial);

module.exports = route;
