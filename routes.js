const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const signUpController = require('./src/controllers/signUpController');
const signInController = require('./src/controllers/signInController');
const tarefaController = require('./src/controllers/tarefaController');

// Rotas da home
route.get('/', homeController.index);

// Rotas de signUp
route.get('/signUp/index', signUpController.index);
route.post('/signUp/register', signUpController.register);

//Rotas de signIn
route.get('/signIn/index', signInController.index);
route.post('/signIn/login', signInController.login);
route.get('/signIn/logout', signInController.logout);

// Rotas de contato
route.get('/tarefa', tarefaController.index);

module.exports = route;
