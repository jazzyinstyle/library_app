const { MongoClient } = require('mongodb');
const debug = require('debug')('app:bookController');

function bookController(bookService, nav) {
  let title;

  function setTitle(inTitle) {
    this.title = inTitle;
  }

  function postByKey(req, res) {
    const { searchKey } = req.body;
    (async function query() {
      try {
        const books = await bookService.getByKey(searchKey);

        debug('Length = ', books.length);
        // debug('ID = ', JSON.stringify(books[0].best_book.id));
        debug('ID = ', JSON.stringify(books[0].best_book.id._));

        res.render(
          'bookListView',
          {
            nav,
            title,
            books
          }
        );
      } catch (error) {
        res.send(error);
      }
    }());
  }

  function getIndex(req, res) {
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
            title,
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
  }

  function getById(req, res) {
    const { id } = req.params;
    debug('getById = ', id);

    // const url = 'mongodb://localhost:27017';
    // const dbName = 'libraryApp';

    (async function mongo() {
      const book = await bookService.getBookById(id);

      res.render(
        'bookView',
        {
          nav,
          title,
          book
        }
      );

      // let client;
      // try {
      //   client = await MongoClient.connect(url);
      //   debug('Connected to MongoDB server');

      //   const db = client.db(dbName);
      //   const col = db.collection('books');
      //   const book = await col.findOne({ _id: new ObjectID(id) });
      //   debug(book);

      //   book.details = await bookService.getBookById(book.bookId);

      //   res.render(
      //     'bookView',
      //     {
      //       nav,
      //       title: 'Library',
      //       book
      //     }
      //   );
      // } catch (err) {
      //   debug(err.stack);
      // }
      // if (client) {
      //   client.close();
      // }
    }());
  }

  function middleware(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  }

  return {
    postByKey,
    getIndex,
    getById,
    middleware,
    setTitle
  };
}

module.exports = bookController;
