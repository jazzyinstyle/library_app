const express = require('express');
// const { MongoClient } = require('mongodb');
const debug = require('debug')('app:authRoutes');

const authRouter = express.Router();

authRouter.route('/signUp')
  .post((req, res) => {
    debug(req.body);
    res.json(req.body);
  });

module.exports = authRouter;
