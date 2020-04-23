const express = require('express');

const Produto = require('../models/produtos');

const router = express.Router();

router.post('/adicionar', async (req, res) =>{
	try {
		const produto = await Produto.create(req.body);	

		return res.send( { produto });

	} catch(err) {
		return res.status(400).send({ error: 'registration fail'});
	}

});


module.exports = app => app.use('produtos', router);
