const debug = require('debug')('app:gitController');
const gitService = require('../services/gitService');

function gitController() {
  function userGet(req, res) {
    const { userId } = req.params;
    debug('userId = ', userId);

    gitService.getUser(userId)
      .then((user) => {
        res.json(user);
      });
  }

  return {
    userGet
  };
}

module.exports = gitController;
