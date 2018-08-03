const express = require('express');
const bookController = require('../controllers/bookController');
const models = require('../../app/models');

const bookRouter = express.Router();
const bookService = require('../services/goodReadsService');


function router(nav) {
  const {
    postByKey,
    getIndex,
    getById,
    middleware
  } = bookController(bookService, nav);

  bookRouter.use(middleware);

  bookRouter.route('/search')
    .post(postByKey);

  bookRouter.route('/')
    .get(getIndex);

  bookRouter.route('/:id')
    .get(getById);

  return bookRouter;
}

module.exports = router;
