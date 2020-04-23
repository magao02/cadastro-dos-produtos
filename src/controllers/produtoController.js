const express = require('express');

const authmiddleware = require('../middlewares/auth');
const Produto = require('../models/produtos');

const router = express.Router();

router.use(authmiddleware);

router.post('/adicionar', async (req, res) =>{
	try {
		const produto = await Produto.create(req.body);	

		return res.send( { produto });

	} catch(err) {
		return res.status(400).send({ error: 'registration fail'});
	}

});


module.exports = app => app.use('produtos', router);
