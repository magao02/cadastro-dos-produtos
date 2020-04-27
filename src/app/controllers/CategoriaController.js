const Categorias = require('../models/categorias');
const Produto = require('../models/produtos');

class CategoriaController {
  static async criar(req, res) {
    const { nome } = req.body;

    const categoria = await Categorias.create({
      nome,
    });

    return res.send({ msg: 'Categoria criada!', categoria });
  }

  static async listar(req, res) {
    let categorias = await Categorias.find().select('nome');
    categorias = categorias.map((categoria) => categoria.nome);

    return res.send({ categorias });
  }

  static async encontrar(req, res) {
    let { nome } = req.params;
    nome = decodeURI(nome);

    try {
      let produtos;
      if (nome !== 'Todos') {
        const categoria = await Categorias.findOne({ nome }).populate('produtos');
        produtos = categoria.produtos;
      } else {
        produtos = await Produto.find();
      }

      produtos.sort((a, b) => a.quantidade - b.quantidade);

      return res.send({
        categoria: {
          nome,
          produtos,
        },
      });
    } catch (err) {
      return res.status(404).send({ error: 'Categoria não encontrada.' });
    }
  }

  static async deletar(req, res) {
    let { nome } = req.params;
    nome = decodeURI(nome);

    try {
      const categoria = await Categorias.findOne({ nome });
      categoria.produtos.forEach(async (id) => {
        const produto = await Produto.findById(id);
        await produto.remove();
      });
      await categoria.remove();
    } catch (err) {
      return res.status(500).send({ error: 'Erro ao deletar a categoria.' });
    }

    return res.send({
      msg: 'Categoria removida.',
    });
  }
}

module.exports = CategoriaController;
