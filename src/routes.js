const express = require('express');

const routes = express.Router();

// const authMiddleware = require('./app/middlewares/auth');

const AuthController = require('./app/controllers/AuthController');
const ProdutoController = require('./app/controllers/ProdutoController');
const CategoriaController = require('./app/controllers/CategoriaController');

routes.post('/login', AuthController.criar);

// routes.use(authMiddleware);

routes.get('/produtos', ProdutoController.listar);
routes.post('/produtos/adicionar', ProdutoController.criar);
routes.delete('/produtos/:id', ProdutoController.deletar);

routes.get('/categorias', CategoriaController.listar);
routes.get('/categorias/:nome', CategoriaController.encontrar);
routes.post('/categorias/adicionar', CategoriaController.criar);
routes.delete('/categorias/:id', CategoriaController.deletar);

module.exports = routes;
