const fs = require('fs');
const mongoose = require('../../database');

const ProdutoSchema = new mongoose.Schema({

  categoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categorias',
    require: true,
  },

  nome: {
    type: String,
    require: true,
  },

  quantidade: {
    type: Number,
    require: true,
  },

  imagem: {
    type: String,
    require: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

});

ProdutoSchema.post('remove', async (produto) => {
  fs.unlink(`./${produto.imagem}`, (err) => {
    if (err) throw err;
  });
});

const Produto = mongoose.model('Produto', ProdutoSchema);

module.exports = Produto;
