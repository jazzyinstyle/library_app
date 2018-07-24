const express = require('express');
const bookRouter = express.Router();
const debug = require('debug')('app:bookRoutes');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('PSLibrary', 'library', 'Abcd1234', {
  host: 'pslibrary-andrew.database.windows.net',
  dialect: 'mssql',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  operatorsAliases: false,
  dialectOptions: {
    encrypt: true // Use this if you're on Azure
  }
});


function router(nav) {
  const books = [
    {
      title: 'War and Peace',
      genre: 'Historical Fiction',
      author: 'Lev Niko',
      read: false
    },
    {
      title:  'Koko and Blue',
      genre: 'Comedy',
      author: 'Alexander Tool',
      read: false
    },
    {
      title: 'Karate Kid',
      genre: 'Fiction',
      author: 'Yamasaki',
      read: true
    }
  ];
  bookRouter.route('/')
    .get((req, res) => {
      (async function query() {
        const result = await sequelize.query('select * from books');
        res.render(
          'bookListView',
          {
            nav,
            title: 'Library',
            books: result[0]
          }
        );
      }());
    });
  bookRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;
      res.render(
        'bookView',
        {
          nav,
          title: 'Library',
          book: books[id]
        }
      );
    });
  return bookRouter;
}

module.exports = router;
