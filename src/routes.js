const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const routes = express.Router();

const authMiddleware = require('./app/middlewares/auth');

const AuthController = require('./app/controllers/AuthController');
const ProdutoController = require('./app/controllers/ProdutoController');
const CategoriaController = require('./app/controllers/CategoriaController');

routes.post('/login', AuthController.criar);

routes.use(authMiddleware);

routes.get('/produtos', ProdutoController.listar);
const upload = multer(multerConfig);
routes.post('/produtos/adicionar', upload.single('imagem'), ProdutoController.criar);
routes.put('/produtos/:id', ProdutoController.atualizar);
routes.delete('/produtos/:id', ProdutoController.deletar);

routes.get('/categorias', CategoriaController.listar);
routes.get('/categorias/:nome', CategoriaController.encontrar);
routes.post('/categorias/adicionar', CategoriaController.criar);
routes.delete('/categorias/:nome', CategoriaController.deletar);

module.exports = routes;
