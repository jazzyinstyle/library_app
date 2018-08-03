const axios = require('axios');
const xml2js = require('xml2js');
const debug = require('debug')('app:goodReadsService');

const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config.json')[env];

const parser = xml2js.Parser({ explicitArray: false });

function getSearchApiUrl(key) {
  return `https://www.goodreads.com/search/index.xml?key=${config.goodReadApiKey}&q=${key}`;
}

function getBookApiUrl(id) {
  return `https://www.goodreads.com/book/show/${id}.xml?key=${config.goodReadApiKey}`;
}

function goodReadsService() {
  function getByKey(key) {
    debug('Search URL = ', getSearchApiUrl(key));

    return new Promise((resolve, reject) => {
      axios.get(getSearchApiUrl(key))
        .then((response) => {
          parser.parseString(response.data, (err, result) => {
            if (err) {
              debug(err);
            } else {
              resolve(result.GoodreadsResponse.search.results.work);
            }
          });
        })
        .catch((error) => {
          debug(error);
          reject(error);
        });
    });
  }

  function getBookById(id) {
    return new Promise((resolve, reject) => {
      axios.get(getBookApiUrl(id))
        .then((response) => {
          parser.parseString(response.data, (err, result) => {
            if (err) {
              debug(err);
            } else {
              debug(result);
              resolve(result.GoodreadsResponse.book);
            }
          });
        })
        .catch((error) => {
          reject(error);
          debug(error);
        });
    });
  }

  return {
    getBookById,
    getByKey
  };
}

module.exports = goodReadsService();
