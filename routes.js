const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const signUpController = require('./src/controllers/signUpController');
const signInController = require('./src/controllers/signInController');
const tarefaController = require('./src/controllers/tarefaController');

const { loginRequired } = require('./src/middlewares/middleware')

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
route.get('/tarefa/index', loginRequired ,tarefaController.index);
route.post('/tarefa/register', loginRequired,tarefaController.register);
route.get('/tarefa/index/:id', loginRequired, tarefaController.editIndex);
route.post('/tarefa/edit/:id', loginRequired, tarefaController.edit);
route.get('/tarefa/delete/:id', loginRequired, tarefaController.delete);

module.exports = route;
