const axios = require('axios');
const debug = require('debug')('app:gitService');

function gitService() {
  const instance = axios.create({
    baseURL: 'https://api.github.com/',
    headers: { 'User-Agent': 'gitExample' }
  });

  function getUserRepoUrl(userId) {
    return `users/${userId}/repos`;
  }

  function getUserUrl(userId) {
    return `users/${userId}`;
  }

  function getRepos(userId) {
    return new Promise((resolve, reject) => {
      instance.request(getUserRepoUrl(userId))
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          debug(error);
          reject(error);
        });
    });
  }

  function getUser(userId) {
    return new Promise((resolve, reject) => {
      instance.request(getUserUrl(userId))
        .then((response) => {
          const user = response.data;
          (async function query() {
            user.repo = await getRepos(userId);
            resolve(user);
          }());
        })
        .catch((error) => {
          debug(error);
          reject(error);
        });
    });
  }

  return {
    getUser
  };
}

module.exports = gitService();
