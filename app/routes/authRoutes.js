const express = require('express');
const { MongoClient } = require('mongodb');
const passport = require('passport');
const debug = require('debug')('app:authRoutes');

const authRouter = express.Router();

function router(nav) {
  authRouter.route('/signUp')
    .post((req, res) => {
      // create user
      const { username, password } = req.body;
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function addUser() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected to the MongoDB server');

          const db = client.db(dbName);
          const col = db.collection('users');
          const user = { username, password };

          let existingUser = await col.findOne({ username });
          if (!existingUser) {
            const result = await col.insertOne(user);
            existingUser = result.ops[0];
          }

          req.login(existingUser, () => {
            res.redirect('/auth/profile');
          });
        } catch (err) {
          debug(err);
        }
        if (client) {
          client.close();
        }
      }());
    });

  authRouter.route('/signIn')
    .get((req, res) => {
      res.render('signin', {
        nav,
        title: 'Sign In'
      });
    })
    .post(passport.authenticate('local', {
      successRedirect: '/auth/profile',
      failureRedirect: '/'
    }));

  authRouter.route('/logout')
    .get((req, res) => {
      req.logout();
      res.redirect('/');
    });

  authRouter.route('/profile')
    .all((req, res, next) => {
      if (req.user) {
        next();
      } else {
        res.redirect('/');
      }
    })
    .get((req, res) => {
      res.render('profile');
    });

  return authRouter;
}

module.exports = router;
