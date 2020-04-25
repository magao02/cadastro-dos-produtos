const mongoose = require('../../database');

const CategoriasSchema = new mongoose.Schema({
	nome: {
		type: String,		
		require: true,
	},
	produtos: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Produto',
		require: true,
	}],
});

const Categorias = mongoose.model('Categorias', CategoriasSchema);

module.exports = Categorias;
