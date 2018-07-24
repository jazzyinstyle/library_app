const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const sql = require('mssql');
const Sequelize = require('sequelize');

const app = express();
const port = process.env.PORT || 3000;

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

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
// app.set('view engine', 'pug');
app.set('view engine', 'ejs');

const cytricRouter = require('./src/routes/cytricRoutes.js');

app.use('/cytric', cytricRouter);

const nav = [
  { link: '/books', title: 'Book' },
  { link: '/authors', title: 'Author' }
];

const bookRouter = require('./src/routes/bookRoutes.js')(nav);

app.use('/books', bookRouter);
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
  debug(`Listening on port ${chalk.green('3000')}`);
});
