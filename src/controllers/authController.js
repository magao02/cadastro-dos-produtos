const express = require('express');
const jwt = require('jsonwebtoken')

const authconfig = require("../config/auth");

const router = express.Router();

function generatetoken(params = {}){
	return jwt.sign(params, authconfig.secret, {
		expiresIn: 86400
	})
}

router.post('/login', async (req, res) => {
	const{ accessToken } = req.headers;

	if (!accessToken)
		return res.status(400).send({ error : "Access token not provided"});

  

	return res.send({ user,
	 token: generatetoken({id: user.id}),});
});

module.exports = app => app.use('/auth', router);
