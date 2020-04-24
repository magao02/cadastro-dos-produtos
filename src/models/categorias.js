const mongoose = require('../database');

const CategoriasSchema = new mongoose.Schema({
	Categoria: {
		type: String,		
		require: true,


	}

	
});

const Categorias = mongoose.model('Categorias', CategoriasSchema);

module.exports = Produto;
