const mongoose = require('mongoose');

const ProdutoSchema = new mongoose.Schema({
	produtos: {
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
