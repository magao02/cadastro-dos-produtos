const express = require('express');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const authconfig = require("../config/auth");
const admins = require('../config/admins');

const router = express.Router();

function generatetoken(params = {}){
	return jwt.sign(params, authconfig.secret, {
		expiresIn: 86400
	})
}

router.post('/login', async (req, res) => {
	const { accesstoken } = req.headers;

	if (!accesstoken)
		return res.status(400).send({ error : "Access token not provided"});

  const path = `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accesstoken}`;
  const response = undefined;
  try {
    response = await axios.get(path);
  } catch (err) {
    return res.status(403).json({ error: 'Access Forbidden' })
  }

  const user = response.data;
  if (!(admins.includes(user.email)))
    return res.status(401).json({ error: 'Você não é administrador.' })

	return res.send({ user,
	  token: generatetoken({id: user.id}),});
});

module.exports = app => app.use('/auth', router);
