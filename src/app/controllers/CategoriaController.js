const Categorias = require('../models/categorias');
const Produto = require('../models/produtos');

class CategoriaController {
  async criar(req, res) {
    const { nome } = req.body;

    const categoria = await Categorias.create({
      nome,
    });

    return res.send({ msg: 'Categoria criada!', categoria });
  }

  async listar(req, res) {
    const categorias = await Categorias.find();

    return res.send({ categorias });
  }

  async encontrar(req, res) {
    const { nome } = req.params;

    const categoria = await Categorias.findOne({ nome });
    const produtos = await Produto.find().where({ categoria: categoria.id});

    return res.send({
      categoria: categoria.nome,
      produtos,
    });
  }

  async deletar(req, res) {
    await Categorias.findByIdAndRemove(req.params.id);

    return res.send({
      msg: 'Categoria removida.'
    })
  }
}

module.exports = new CategoriaController();