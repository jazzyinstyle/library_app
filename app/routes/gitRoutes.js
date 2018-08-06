const express = require('express');
const debug = require('debug')('app:gitRoutes');

const gitController = require('../controllers/gitController');

const gitRouter = express.Router();

function router() {
  const { userGet } = gitController();

  gitRouter.route('/:userId')
    .get(userGet);

  return gitRouter;
}

module.exports = router;
