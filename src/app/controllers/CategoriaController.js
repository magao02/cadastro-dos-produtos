const Categorias = require('../models/categorias');

class CategoriaController {
  static async criar(req, res) {
    const { nome } = req.body;

    const categoria = await Categorias.create({
      nome,
    });

    return res.send({ msg: 'Categoria criada!', categoria });
  }

  static async listar(req, res) {
    const categorias = await Categorias.find();

    return res.send({ categorias });
  }

  static async encontrar(req, res) {
    const { nome } = req.params;

    try {
      const categoria = await Categorias.findOne({ nome });

      return res.send({
        categoria: {
          nome,
          produtos: categoria.produtos,
        },
      });
    } catch (err) {
      return res.status(404).send({ error: 'Categoria não encontrada.' });
    }
  }

  static async deletar(req, res) {
    const { nome } = req.body;

    try {
      await Categorias.findOneAndRemove({ nome });
    } catch (err) {
      return res.status(500).send({ error: 'Erro ao deletar a categoria.' });
    }

    return res.send({
      msg: 'Categoria removida.',
    });
  }
}

module.exports = CategoriaController;
