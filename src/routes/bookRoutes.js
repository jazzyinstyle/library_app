const express = require('express');

const bookRouter = express.Router();

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
      'books',
      {
        nav: [{ link: '/books', title: 'Books' },
          { link: '/authors', title: 'Authors' }],
        title: 'Library',
        books
      }
    );
});

bookRouter.route('/single')
  .get((req, res) => {
    res.send('Hello single book');
  });

module.exports = bookRouter;
