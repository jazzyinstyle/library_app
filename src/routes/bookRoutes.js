const express = require('express');

const bookRouter = express.Router();

function router(nav) {
  const books = [
    {
      title: 'War and Peace',
      genre: 'Historical Fiction',
      author: 'Lev Niko',
      read: false
    },
    {
      title: 'Koko and Blue',
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
      res.render(
        'bookListView',
        {
          nav,
          title: 'Library',
          books
        }
      );
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
