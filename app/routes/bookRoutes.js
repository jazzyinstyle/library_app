const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookRoutes');
const models = require('../../app/models');

const bookRouter = express.Router();

function router(nav) {
  bookRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;
        try {
          // This is for MSSql
          // const result = await models.sequelize.query('select * from books');

          client = await MongoClient.connect(url);
          debug('Connected correctly to server');

          const db = client.db(dbName);
          const col = await db.collection('books');
          const books = await col.find().toArray();

          res.render(
            'bookListView',
            {
              nav,
              title: 'Library',
              // books: result[0] // this is for MSSql
              books
            }
          );
        } catch (err) {
          debug(err.stack);
        }

        if (client) {
          client.close();
        }
      }());
    });
  bookRouter.route('/:id')
    .all((req, res, next) => {
      (async function query() {
        const { id } = req.params;
        const url = 'mongodb://localhost:27017';
        const dbName = 'libraryApp';

        let client;
        try {
          // This is for MSSql
          // const result = await models.sequelize.query('select * from books');

          client = await MongoClient.connect(url);
          debug('Connected correctly to server');

          const db = client.db(dbName);
          const col = await db.collection('books');

          const book = await col.findOne({ _id: new ObjectID(id) });
          debug(book);
          req.book = book;
        } catch (err) {
          debug(err.stack);
        }

        if (client) {
          client.close();
        }

        // This portion is for MSSql
        // const result = await models.sequelize
        //   .query('select * from books where id = :id',
        //     { replacements: { id }, type: models.sequelize.QueryTypes.SELECT });
        // req.book = result[0]; // ES6 - array destructuring => [req.book] = result
        next();
      }());
    })
    .get((req, res) => {
      res.render(
        'bookView',
        {
          nav,
          title: 'Library',
          book: req.book
        }
      );
    });
  return bookRouter;
}

module.exports = router;
