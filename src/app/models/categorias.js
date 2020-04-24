const mongoose = require('../../database');

const CategoriasSchema = new mongoose.Schema({
	nome: {
		type: String,		
		require: true,
	}
});

const Categorias = mongoose.model('Categorias', CategoriasSchema);

module.exports = Categorias;
