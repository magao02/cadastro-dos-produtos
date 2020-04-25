const Produto = require('../models/produtos');
const Categorias = require('../models/categorias');

class ProdutoController {
  static async criar(req, res) {
    try {
      const { nome, quantidade, categoria } = req.body;

      const categoriaObj = await Categorias.findOne({
        nome: categoria,
      });
      if (!categoriaObj) { return res.status(400).send({ error: 'Categoria não encontrada.' }); }

      const produto = await Produto.create({
        categoria: categoriaObj.id,
        nome,
        quantidade,
      });

      categoriaObj.produtos.push(produto.id);
      categoriaObj.save();

      return res.send({ produto });
    } catch (err) {
      return res.status(400).send({ error: 'registration fail' });
    }
  }

  static async listar(req, res) {
    try {
      const produtos = await Produto.find().populate('categoria');

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
      await Produto.findByIdAndRemove(req.params.id);

      return res.send({ msg: 'Produto deletado.' });
    } catch (err) {
      return res.status(400).send({ error: 'error delete' });
    }
  }
}


module.exports = ProdutoController;
