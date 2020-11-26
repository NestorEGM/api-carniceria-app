const jwt = require('jsonwebtoken');
const { InvalidTokenError } = require('../errors');

const SEED = process.env.SEED;

const verifyToken = (req, res, next) => {
  try {
    const auth = req.get('Authorization');
    if (!auth) {
      throw new InvalidTokenError();
    }
    const token = auth.split(' ')[1];
    jwt.verify(token, SEED, (error, payload) => {
      if (error) {
        throw new InvalidTokenError();
      }
      req.user = payload.user;
      next();
    });
  } catch (error) {
    if (error instanceof InvalidTokenError) {
      return res.status(error.status).json({
        ok: false,
        error: error.message,
      });
    }
    res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
};

module.exports = {
  verifyToken,
};