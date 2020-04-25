const express = require('express');
const multer = require("multer");
const multerConfig = require("./config/multer");

const routes = express.Router();

const authMiddleware = require('./app/middlewares/auth');

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


const Imagem = require("./models/imagem");
routes.post("/imagem", multer(multerConfig).single("file"), async (req, res) => {
  

  const imagem = await Post.create({
    nome: req.file.name,
    size: req.file.size,
    key: req.file.filename,
    url: ""
  });

  return res.json( imagem );
});



module.exports = routes;