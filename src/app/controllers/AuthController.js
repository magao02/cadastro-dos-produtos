const jwt = require('jsonwebtoken');
const axios = require('axios');

const authconfig = require('../../config/auth');
// const admins = require('../../config/admins');

function generatetoken(params = {}) {
  return jwt.sign(params, authconfig.secret, {
    expiresIn: 86400,
  });
}

class AuthController {
  static async criar(req, res) {
    const { accesstoken } = req.headers;

    if (!accesstoken) { return res.status(400).send({ error: 'Access token not provided' }); }

    const path = `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accesstoken}`;
    let response;
    try {
      response = await axios.get(path);
    } catch (err) {
      return res.status(403).json({ error: 'Access Forbidden' });
    }

    const user = response.data;
    // A próxima linha verificaria se o e-mail está entre os administradores.
    /* if (!(admins.includes(user.email))) {
      return res.status(401).json({ error: 'Você não é administrador.' });
    } */

    return res.send({
      user,
      token: generatetoken({ id: user.id }),
    });
  }
}

module.exports = AuthController;
