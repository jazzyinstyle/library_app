const passport = require('passport');
const debug = require('debug')('app:passport');

require('./strategy/local.strategy')();

module.exports = function passportConfig(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  // Stores user in session
  passport.serializeUser((user, done) => {
    debug('Passport serializeUser => ', JSON.stringify(user));
    done(null, user);
  });

  // Retrieves user from session
  passport.deserializeUser((user, done) => {
    debug('Passport deserializeUser => ', JSON.stringify(user));
    done(null, user);
  });
};