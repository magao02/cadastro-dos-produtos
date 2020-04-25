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

	createdAt: {
		type: Date,
		 default: Date.now,	
		}

});

const Produto = mongoose.model('Produto', ProdutoSchema);

module.exports = Produto;
