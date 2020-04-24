const express = require('express');

const authmiddleware = require('../middlewares/auth');
const Produto = require('../models/produtos');
const Categorias = require('../models/categorias');

const router = express.Router();

// A linha abaixo ativa o authMiddleware. Só ativar quando tudo estiver pronto.
// router.use(authmiddleware);



router.get('/', async (req, res) => {
	try {
		const Produto = await Produto.find();
	} catch (err) {
		return res.status(400).send({ error: 'listagem não encontrada'});
	}
});
router.get('/:produto', (req, res) => {
	try {
		const Produto = await Produto.findbyId(req.params.ProdutoId).populate('Categorias')
	} catch (err) {
		return res.status(400).send({ error: 'produto não encontrado'});
	}
});

router.post('/adicionar', async (req, res) =>{
	try {
		const produto = await Produto.create(...req.body, Categorias: req.CategoriasId);	

		return res.send( { Produto });

	}  catch(err) {
		return res.status(400).send({ error: 'registration fail'});
	}

});
router.put('/:produto', (req, res) => {
	res.send({ ok: true, Categorias: req.CategoriasId})
});

router.delete('/:produto', (req, res) => {
	try{const Produto = await Produto.findbyAndRemoveId(req.params.ProdutoId).populate('Categorias')

	
} catch(err) {
		return res.status(400).send({ error: 'error delete'});
	}  
});


module.exports = app => app.use('produtos', router);
