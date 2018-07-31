const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminRoutes');
// const models = require('../../app/models');

const adminRouter = express.Router();

const books = [
  {
    title: 'War and Peace',
    genre: 'Historical Fiction',
    author: 'Lev Kevi',
    read: false
  },
  {
    title: 'War and Peace 2',
    genre: 'Historical Fiction 2',
    author: 'Lev Kevi 3',
    read: false
  },
  {
    title: 'War and Peace 3',
    genre: 'Historical Fiction 3',
    author: 'Lev Kevi 3',
    read: false
  },
  {
    title: 'War and Peace 4',
    genre: 'Historical Fiction 4',
    author: 'Lev Kevi 4',
    read: false
  },
  {
    title: 'War and Peace 5',
    genre: 'Historical Fiction 5',
    author: 'Lev Kevi 5',
    read: false
  },
];

adminRouter.route('/')
  .get((req, res) => {
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected correctly to server');

        const db = client.db(dbName);

        await db.collection('books').drop();
        const response = await db.collection('books').insertMany(books);

        res.json(response);
      } catch (err) {
        debug(err.stack);
      }

      if (client) {
        client.close();
      }
    }());
  });

module.exports = adminRouter;
