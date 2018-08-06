const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const models = require('./app/models');

const app = express();
const port = process.env.PORT || 3000;

// Sequelize connect to Azure MSSql
// models.sequelize
//   .authenticate()
//   .then(() => {
//     debug('Connection has been established successfully');
//   })
//   .catch((err) => {
//     debug('Unable to connect to the database:', err);
//   });

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'library' }));
app.use(express.static(path.join(__dirname, '/public/')));

require('./config/passport')(app);

app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './app/views/public');
// app.set('view engine', 'pug');
app.set('view engine', 'ejs');

const cytricRouter = require('./app/routes/cytricRoutes');

app.use('/cytric', cytricRouter);

const nav = [
  { link: '/books', title: 'Book' },
  { link: '/authors', title: 'Author' }
];

const bookRouter = require('./app/routes/bookRoutes')(nav);
const adminRouter = require('./app/routes/adminRoutes');
const authRouter = require('./app/routes/authRoutes')(nav);
const gitRouter = require('./app/routes/gitRoutes')();

app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);
app.use('/git', gitRouter);

app.get('/', (req, res) => {
  // res.sendFile(path.join(__dirname, '/views/', '/index.html'));

  /* Pug example */
  // res.render('index', { list: ['a', 'b'] });

  /* EJS example */
  res.render(
    'index',
    {
      nav,
      title: 'Library'
    }
  );
});

app.listen(port, () => {
  debug(`Listening on port ${chalk.green(port)}`);
});
