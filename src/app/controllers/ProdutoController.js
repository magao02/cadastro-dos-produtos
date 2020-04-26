const Produto = require('../models/produtos');
const Categorias = require('../models/categorias');

class ProdutoController {
  static async criar(req, res) {
    try {
      const { nome, quantidade, categoria } = req.body;

      const { path } = req.file;

      const categoriaObj = await Categorias.findOne({
        nome: categoria,
      });
      if (!categoriaObj) { return res.status(400).send({ error: 'Categoria não encontrada.' }); }

      const produto = await Produto.create({
        categoria: categoriaObj.id,
        nome,
        quantidade,
        imagem: path,
      });

      categoriaObj.produtos.push(produto.id);
      await categoriaObj.save();

      return res.send({ produto });
    } catch (err) {
      return res.status(400).send({ error: 'Não foi possível criar o produto.' });
    }
  }

  static async listar(req, res) {
    try {
      const produtos = await Produto.find();

      return res.send({ produtos });
    } catch (err) {
      return res.status(400).send({ error: 'listagem não encontrada' });
    }
  }

  static async encontrar(req, res) {
    try {
      const produto = await Produto.findById(req.params.ProdutoId).populate('Categorias');

      return res.send({ produto });
    } catch (err) {
      return res.status(400).send({ error: 'produto não encontrado' });
    }
  }

  static async deletar(req, res) {
    try {
      const { id } = req.params;
      const produto = await Produto.findById(id);

      const categoria = await Categorias.findById(produto.categoria);
      const produtos = categoria.produtos.filter((itemId) => !(itemId.equals(produto.id)));
      categoria.produtos = produtos;
      await categoria.save();

      await produto.remove();

      return res.send({ msg: 'Produto deletado.' });
    } catch (err) {
      return res.status(400).send({ error: 'error delete' });
    }
  }
}

module.exports = ProdutoController;
